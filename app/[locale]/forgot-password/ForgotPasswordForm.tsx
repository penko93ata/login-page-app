"use client";

import { useActionState } from "react";
import styles from "../form.module.css";
import { forgotPassword } from "./actions";
import { useFormStatus } from "react-dom";
import { Button, FormField } from "../../../components/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("ForgotPasswordPage");

  return (
    <Button type='submit' size='lg' variant='primary' loading={pending} disabled={pending}>
      {pending ? t("sendingResetLink") : t("sendResetLink")}
    </Button>
  );
}

export default function ForgotPasswordForm() {
  const [state, forgotPasswordAction] = useActionState(forgotPassword, undefined);
  const t = useTranslations("ForgotPasswordPage");

  // Helper function to get field-specific errors
  const getFieldError = (fieldName: "email"): string | undefined => {
    return state?.errors?.properties?.[fieldName]?.errors?.join("\r\n");
  };

  // Get general form errors
  const getGeneralError = (): string | undefined => {
    return state?.errors?.errors?.[0];
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeaderContainer}>
        <h1 className={styles.formHeaderTitle}>{t("title")}</h1>
        <p className={styles.formHeaderSubtitle}>{t("subtitle")}</p>
      </div>

      <form action={forgotPasswordAction} className={styles.form}>
        {/* Show general errors at the top of the form */}
        {getGeneralError() && (
          <div
            style={{
              color: "var(--color-destructive)",
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "var(--color-destructive-foreground)",
              borderRadius: "6px",
              border: "1px solid var(--color-destructive)",
            }}
          >
            {getGeneralError()}
          </div>
        )}

        {/* Show success message */}
        {state?.success && (
          <div
            style={{
              color: "var(--color-success)",
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "var(--color-success-foreground)",
              borderRadius: "6px",
              border: "1px solid var(--color-success)",
            }}
          >
            {t("success")}
          </div>
        )}

        <FormField
          label={t("email")}
          name='email'
          type='email'
          placeholder={t("emailPlaceholder")}
          required
          fullWidth
          errorMessage={getFieldError("email")}
        />

        <SubmitButton />
      </form>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href='/login'>{t("backToLogin")}</Link>
      </div>
    </div>
  );
}
