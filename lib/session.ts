import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = "NEXTAUTH_SECRET";
const encodedKey = new TextEncoder().encode(secretKey);

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
    console.log("Failed to verify session", error);
  }
}
