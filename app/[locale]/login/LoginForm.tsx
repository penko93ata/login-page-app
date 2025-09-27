"use client";

import Link from "next/link";
import { Button, FormField } from "../../../components/ui";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";
import { useAuth } from "@/lib/features/auth/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "./LoginForm.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("LoginPage");

  return (
    <Button type='submit' size='lg' variant='primary' loading={pending} disabled={pending}>
      {pending ? t("signingIn") : t("signIn")}
    </Button>
  );
}

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const { setAuthUser } = useAuth();
  const router = useRouter();
  const t = useTranslations("LoginPage");

  // Handle successful login
  useEffect(() => {
    if (state?.success && state?.user) {
      // Set user in Redux store
      setAuthUser(state.user);

      // Redirect to home page
      router.push("/");
    }
  }, [state?.success, state?.user, setAuthUser, router]);

  // Helper function to get field-specific errors
  const getFieldError = (fieldName: "email" | "password"): string | undefined => {
    return state?.errors?.properties?.[fieldName]?.errors?.join("\r\n");
  };

  // Get general form errors (like authentication failures)
  const getGeneralError = (): string | undefined => {
    return state?.errors?.errors?.[0];
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginFormHeaderContainer}>
        <h1 className={styles.loginFormHeaderTitle}>{t("title")}</h1>
        <p className={styles.loginFormHeaderSubtitle}>{t("subtitle")}</p>
      </div>

      <form action={loginAction} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
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

        <FormField
          label={t("email")}
          name='email'
          type='email'
          placeholder={t("emailPlaceholder")}
          required
          fullWidth
          errorMessage={getFieldError("email")}
        />

        <FormField
          label={t("password")}
          name='password'
          type='password'
          placeholder={t("passwordPlaceholder")}
          required
          fullWidth
          errorMessage={getFieldError("password")}
        />

        <SubmitButton />
      </form>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href='/forgot-password'>{t("forgotPassword")}</Link>
      </div>
    </div>
  );
}
