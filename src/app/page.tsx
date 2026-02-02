import styles from "./page.module.css";
import PrayerChart from "@/components/PrayerChart";

export default function Home() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroLeft}></div>
      <div className={styles.chartContainer}>
        <PrayerChart />
      </div>
    </header>
  );
}
