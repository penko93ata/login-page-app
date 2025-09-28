import { getTranslations } from "next-intl/server";
import z from "zod";

export async function getPasswordSchema() {
  const t = await getTranslations("LoginPage.errors");

  return z
    .string()
    .min(9, t("passwordTooShort"))
    .regex(/[A-Z]/, t("passwordMissingUppercase"))
    .regex(/[0-9]/, t("passwordMissingNumber"))
    .regex(/[^A-Za-z0-9]/, t("passwordMissingSpecialChar"))
    .trim();
}

export async function getEmailSchema() {
  const t = await getTranslations("LoginPage.errors");

  return z.email({ error: "emailInvalid" }).min(1, t("emailRequired")).trim();
}

export async function getLoginSchema() {
  const emailSchema = await getEmailSchema();
  const passwordSchema = await getPasswordSchema();

  return z.object({
    email: emailSchema,
    password: passwordSchema,
  });
}

export async function getForgotPasswordSchema() {
  const emailSchema = await getEmailSchema();

  return z.object({
    email: emailSchema,
  });
}

// // Keep the original schemas for backward compatibility
// export const passwordSchema = z
//   .string()
//   .min(9, "Password must be more than 8 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[0-9]/, "Password must contain at least one number")
//   .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
//   .trim();

// export const emailSchema = z.email({ message: "Invalid email address" }).min(1, "Email is required").trim();

// export const loginSchema = z.object({
//   email: emailSchema,
//   password: passwordSchema,
// });

// export const forgotPasswordSchema = z.object({
//   email: emailSchema,
// });
