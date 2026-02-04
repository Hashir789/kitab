import styles from "./page.module.css";
import PrayerChart from "@/components/prayerchart/PrayerChart";

export default function Home() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>
          Be Your Own <span className={styles.highlight}>Accountant</span>
        </h1>
        <p className={styles.heroSubtext}>
          Track your deeds, reflect, grow, and improve every day — with <strong className={styles.brandName}>Kitaab</strong>.
        </p>
      </div>
      <div className={styles.chartContainer}>
        <PrayerChart />
      </div>
    </header>
  );
}
