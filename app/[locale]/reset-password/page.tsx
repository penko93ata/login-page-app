"use client";

import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPasswordPage");

  return (
    <div className={styles.resetPasswordContainer}>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>

      <p className={styles.resetPasswordContainer}>
        {t("accessInfo")}
        <br />
        {t("expiryInfo")}
      </p>
    </div>
  );
}
