"use client";

import { motion } from "framer-motion";
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
        Track your deeds, reflect, grow, and improve every day — with{" "}
        <strong className={styles.brandName}>Kitaab</strong>.
      </p>
    </motion.div>
  );
}

