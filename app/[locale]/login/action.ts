"use server";

import { validateCredentials, getCurrentUser } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { emailSchema, loginSchema, passwordSchema } from "@/schemas/form.schema";
import { redirect } from "next/navigation";
import z from "zod";

// Type for the treeified error structure
export type LoginActionState =
  | {
      errors?: {
        errors?: string[];
        properties?: {
          email?: {
            errors?: string[];
          };
          password?: {
            errors?: string[];
          };
        };
      };
      success?: boolean;
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  | undefined;

export async function login(prevState: unknown, formData: FormData): Promise<LoginActionState> {
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
          errors: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);

    // Return success with user data so the client can dispatch Redux action
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      errors: {
        errors: ["Login failed. Please try again."],
      },
    };
  }
}

// Server action to check current authentication status
export async function checkAuthAction() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { user: null, isAuthenticated: false };
    }

    return { user, isAuthenticated: true };
  } catch (error) {
    console.error("Server action checkAuth error:", error);
    return { user: null, isAuthenticated: false };
  }
}

// Server action to logout user
export async function logoutAction() {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Server action logout error:", error);
    throw new Error("Logout failed");
  }

  redirect("/login");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
