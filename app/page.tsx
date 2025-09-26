import { Button, Input } from "@/components/ui";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <Button size='lg' variant='primary'>
          Primary
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
        <Input type='email' />
      </div>
    </div>
  );
}
