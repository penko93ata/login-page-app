import { useActionState } from "react";
import styles from "../form.module.css";
import { forgotPassword } from "./actions";
import { useFormStatus } from "react-dom";
import { Button, FormField } from "../../../components/ui";
import { useTranslations } from "next-intl";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("LoginPage");

  return (
    <Button type='submit' size='lg' variant='primary' loading={pending} disabled={pending}>
      {pending ? t("signingIn") : t("signIn")}
    </Button>
  );
}

export default function ForgotPasswordForm() {
  const [state, forgotPasswordAction] = useActionState(forgotPassword, undefined);
  const t = useTranslations("LoginPage");

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeaderContainer}>
        <h1 className={styles.formHeaderTitle}>Forgot Password</h1>
        <p className={styles.formHeaderSubtitle}>Enter your email address and we&apos;ll send you a link to reset your password.</p>
      </div>

      <form action={forgotPasswordAction} className={styles.form}>
        <FormField
          label={t("email")}
          name='email'
          type='email'
          placeholder={t("emailPlaceholder")}
          required
          fullWidth
          // errorMessage={getFieldError("email")}
        />

        <SubmitButton />
      </form>
    </div>
  );
}
