"use client";

import Link from "next/link";
import { Button, FormField } from "../../../components/ui";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";
import { useAuth } from "@/lib/features/auth/useAuth";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' size='lg' variant='primary' loading={pending} disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const { setAuthUser } = useAuth();
  const router = useRouter();

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
    <>
      <form action={loginAction}>
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

        <FormField label='Email' name='email' type='email' placeholder='your@email.com' required errorMessage={getFieldError("email")} />

        <FormField
          label='Password'
          name='password'
          type='password'
          placeholder='••••••••'
          required
          errorMessage={getFieldError("password")}
        />

        <SubmitButton />
      </form>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href='/forgot-password'>Forgot Password?</Link>
      </div>
    </>
  );
}
