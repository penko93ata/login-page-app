"use client";

import styles from "./page.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.resetPasswordContainer}>
      <h1>Reset Password Page</h1>
      <p>You have successfully accessed the reset password page!</p>

      <p className={styles.resetPasswordContainer}>
        This page is only accessible through the forgot password flow.
        <br />
        Access expires in 5 minutes.
      </p>
    </div>
  );
}
