"use client";

import Link from "next/link";
import { Button, FormField } from "../../../components/ui";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  console.log(state);

  return (
    <>
      <form action={loginAction}>
        <FormField
          label='Email'
          name='email'
          type='email'
          placeholder='your@email.com'
          required
          errorMessage={state?.errors?.properties?.email?.errors?.join("\r\n")}
        />

        <FormField
          label='Password'
          name='password'
          type='password'
          placeholder='••••••••'
          errorMessage={state?.errors?.properties?.password?.errors?.join("\r\n")}
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
