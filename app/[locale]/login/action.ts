"use server";

import { validateCredentials } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

const passwordSchema = z
  .string()
  .min(9, "Password must be more than 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .trim();

const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }).trim(),
  password: passwordSchema,
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.treeifyError(result.error),
    };
  }

  const { email, password } = result.data;

  try {
    const user = await validateCredentials(email, password);

    if (!user) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);

    redirect("/");
  } catch (error) {
    console.error("Login failed:", error);
    return {
      errors: {
        email: ["Login failed. Please try again."],
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
