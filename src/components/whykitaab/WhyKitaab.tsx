import React from "react";
import styles from "./WhyKitaab.module.css";

export default function WhyKitaabSection() {
  return (
    <section
      id="why-kitaab"
      aria-labelledby="why-kitaab-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 id="why-kitaab-heading" className={styles.heading}>
            Why <span className={styles.kitaabHighlight}>Kitaab</span>
          </h2>
          <p>
            Track your daily Hasanaat (good deeds) and Sayyi&apos;at (bad deeds) in one meaningful place. Awareness of your actions is the first step toward real change.
          </p>
          <p>
            Inspired by the concept mentioned in the Qur&apos;an, Kitaab reminds you that every action counts and is recorded.
          </p>
          <p>
            Your deeds stay yours. No one can access your record without your permission, giving you a safe and private space to reflect honestly.
          </p>
          <p>
            Small actions shape who you become. Reflect daily, improve consistently, and strive to increase your good deeds one step at a time.
          </p>
        </div>

        <div className={styles.right}>
          <span
            className={styles.ayahWords}
            data-font-scale="3"
            data-font="p234-v1"
          >
            ﮱ ﯓ ﯔ ﯕ
          </span>

          <p className={styles.translation}>
            Indeed, good deeds remove bad deeds.
          </p>

          <p className={styles.ayahReference}>Al Qur'an 11:114</p>
        </div>
      </div>
    </section>
  );
}
