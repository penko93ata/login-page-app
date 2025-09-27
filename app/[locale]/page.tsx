import { Button, FormField, Input } from "@/components/ui";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("LoginPage");

  return (
    <div className={styles.page}>
      <div>
        <Button size='lg' variant='primary'>
          {t("login")}
        </Button>
        <Button size='sm' variant='secondary'>
          Secondary
        </Button>
        <Button size='xs' variant='ghost'>
          Ghost
        </Button>
        <Button variant='danger'>Danger</Button>
        <Button variant='outline'>Outline</Button>
        <Button disabled variant='secondary'>
          Disabled
        </Button>
        <Button loading variant='secondary'>
          Loading
        </Button>
        <Input type='email' placeholder='Email' />

        <FormField label='Email' type='email' placeholder='your@email.com' required />

        <FormField label='Password' type='password' placeholder='••••••••' errorMessage='Password must be at least 8 characters' required />
      </div>
    </div>
  );
}
