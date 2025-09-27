import Link from "next/link";
import { Button, FormField } from "./ui";

export default function LoginForm() {
  return (
    <>
      <form>
        <FormField label='Email' type='email' placeholder='your@email.com' required />

        <FormField label='Password' type='password' placeholder='••••••••' errorMessage='Password must be at least 8 characters' required />

        <Button type='submit'>Login</Button>
      </form>
      <Link href='/forgot-password'>Forgot Password?</Link>
    </>
  );
}
