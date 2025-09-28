"use server";

import z from "zod";
import { forgotPasswordSchema } from "@/schemas/form.schema";
import { findUserByEmail } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function forgotPassword(prevState: unknown, formData: FormData) {
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.treeifyError(result.error),
    };
  }

  const { email } = result.data;

  const user = findUserByEmail(email);

  if (!user) {
    return null;
  }

  redirect("/reset-password");
}
