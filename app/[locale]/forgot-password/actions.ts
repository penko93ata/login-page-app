"use server";

import z from "zod";
import { forgotPasswordSchema } from "@/schemas/form.schema";
import { findUserByEmail } from "@/lib/auth";
import { redirect } from "next/navigation";

// Type for the treeified error structure
export type ForgotPasswordActionState =
  | {
      errors?: {
        errors?: string[];
        properties?: {
          email?: {
            errors?: string[];
          };
        };
      };
      success?: boolean;
    }
  | undefined;

export async function forgotPassword(prevState: unknown, formData: FormData): Promise<ForgotPasswordActionState> {
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.treeifyError(result.error),
    };
  }

  const { email } = result.data;

  try {
    const user = findUserByEmail(email);

    if (!user) {
      return {
        errors: {
          errors: ["No account found with this email address"],
        },
      };
    }

    // TODO: In a real app, you would:
    // 1. Generate a secure reset token
    // 2. Store it in the database with expiration
    // 3. Send an email with the reset link
    // For now, we'll just simulate success and redirect

    // Return success instead of redirecting immediately
    return {
      success: true,
    };
  } catch (error) {
    console.error("Forgot password failed:", error);
    return {
      errors: {
        errors: ["Failed to send reset link. Please try again."],
      },
    };
  }
}
