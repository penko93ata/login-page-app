import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("LoginPage");

  return <div className={styles.page}>You are logged in.</div>;
}
