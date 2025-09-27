"use client";

import Link from "next/link";
import { Button, FormField } from "../../../components/ui";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <>
      <form action={loginAction}>
        <FormField label='Email' name='email' type='email' placeholder='your@email.com' required />

        <FormField
          label='Password'
          name='password'
          type='password'
          placeholder='••••••••'
          errorMessage='Password must be at least 8 characters'
          required
        />

        <SubmitButton />
      </form>
      <Link href='/forgot-password'>Forgot Password?</Link>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit'>
      Login
    </Button>
  );
}
