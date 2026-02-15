"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "@/app/page.module.css";

export default function HeroText() {
  return (
    <motion.div
      className={styles.heroLeft}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className={styles.heroTitle}>
        Be Your Own <span className={styles.highlight}>Accountant</span>
      </h1>
      <p className={styles.heroSubtext}>
        Track your deeds, reflect, grow, and improve every day <br />
        — with{" "}<strong className={styles.brandName}>Kitaab</strong>.
      </p>
      <div className={styles.heroButtons}>
        <div className={styles.heroButtonContainer}>
          <Link href="/features" className={styles.heroButtonFirst} aria-label="Explore Kitaab features">
            Explore Kitaab
          </Link>
          <Link href="/contact" className={styles.heroButtonSecond} aria-label="Learn more about Kitaab">
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
