import styles from "./page.module.css";
import Hero from "@/components/herotext/HeroText";
import PrayerChartClient from "@/components/prayerchart/PrayerChartClient";
import WhatIsKitaab from "@/components/whatiskitaab/WhatIsKitaab";
import WhyKitaab from "@/components/whykitaab/WhyKitaab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitaab - Be Your Own Accountant",
  description:
    "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
  keywords: [
    "Kitaab",
    "daily deeds",
    "self accountability",
    "habit tracking",
    "life tracking",
    "personal growth",
    "mindful living",
    "self improvement",
    "digital journal",
    "personal record",
    "Hasanaat",
    "Sayyi'at",
    "deed tracker",
    "accountability journal",
  ],
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
  openGraph: {
    title: "Kitaab - Be Your Own Accountant",
    description:
      "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
    url: "https://kitaab.me",
    siteName: "Kitaab",
    images: [
      {
        url: "https://kitaab.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kitaab - Be Your Own Accountant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitaab - Be Your Own Accountant",
    description:
      "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
    images: ["https://kitaab.me/og-image.png"],
  },
  alternates: {
    canonical: "https://kitaab.me",
  },
};

export default function Home() {
  return (
    <main>
      <header className={styles.hero} role="banner">
        <Hero />
        <PrayerChartClient />
      </header>
      <WhatIsKitaab />
      <WhyKitaab />
    </main>
  );
}
