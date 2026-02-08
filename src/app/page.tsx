import styles from "./page.module.css";
import Hero from "@/components/herotext/HeroText";
import PrayerChartClient from "@/components/prayerchart/PrayerChartClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main>
      <header className={styles.hero} role="banner">
        <Hero />
        <PrayerChartClient />
      </header>
    </main>
  );
}