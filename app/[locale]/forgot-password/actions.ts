"use server";

import z from "zod";
import { findUserByEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createResetAccess } from "@/lib/session";
import { getForgotPasswordSchema } from "@/schemas/form.schema";
import { getTranslations } from "next-intl/server";

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
  const forgotPasswordSchema = await getForgotPasswordSchema();
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData));
  const t = await getTranslations("ForgotPasswordPage.errors");

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
          errors: [t("userNotFound")],
        },
      };
    }

    // Create reset access token (allows access to reset-password page)
    await createResetAccess(user.id);
    // Redirect to reset-password page (now accessible due to access token)
    redirect("/reset-password");
  } catch (error) {
    // Don't log NEXT_REDIRECT as an error - it's expected behavior
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error; // Re-throw redirect errors
    }

    console.error("Forgot password failed:", error);
    return {
      errors: {
        errors: [t("sendFailed")],
      },
    };
  }
}
