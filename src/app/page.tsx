import styles from "./page.module.css";
import Hero from "@/components/herotext/HeroText";
import PrayerChartClient from "@/components/prayerchart/PrayerChartClient";

export default function Home() {
  return (
    <main>
      <header className={styles.hero} role="banner">
        <h1 className={styles.visuallyHidden}>
          Track your good and bad deeds with an Islamic prayer tracker
        </h1>
        <Hero />
        <PrayerChartClient />
      </header>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
      <div>Hashir</div>
    </main>
  );
}