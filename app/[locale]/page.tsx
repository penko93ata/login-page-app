"use client";

import { useAuth } from "@/lib/features/auth/useAuth";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      {t("welcomeMessage")} <strong>{user?.email}</strong>
    </div>
  );
}
