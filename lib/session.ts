import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionPayload = { userId: string; expiresAt: Date };

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encryptSession({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  const resetCookies = cookieStore.get("reset-access")?.value;

  // If user is logged in, clear reset password token
  if (resetCookies) {
    await clearResetAccess();
  }
}

// Create a temporary access token for reset-password page
export async function createResetAccess(userId: string) {
  const accessToken = await new SignJWT({
    userId,
    type: "reset-access",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m") // Short-lived access token
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set("reset-access", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 5, // 5 minutes
  });
}

// Clear reset access when done
export async function clearResetAccess() {
  const cookieStore = await cookies();
  cookieStore.delete("reset-access");
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function encryptSession(session: SessionPayload) {
  return new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);
}

export async function decryptSession(session: string | undefined) {
  try {
    if (!session) {
      return null;
    }
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}
