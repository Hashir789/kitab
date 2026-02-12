import React from "react";
import styles from "./WhatIsKitaabSection.module.css";

export default function WhatIsKitaabSection() {
  return (
    <section
      id="what-is-kitaab"
      aria-labelledby="what-is-kitaab-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <span
            className={styles.ayahWords}
            data-font-scale="3"
            data-font="p283-v1"
          >
            ﮭ ﮮ ﮯ ﮰ ﮱ ﯓ ﯔ ﯕ
          </span>

          <p className={styles.translation}>
            Read your record. Sufficient is yourself against you this Day as
            accountant.
          </p>

          <p className={styles.ayahReference}>Al Qur'an 17:14</p>
        </div>

        <div className={styles.right}>
          <h2 id="what-is-kitaab-heading" className={styles.heading}>
            What is Kitaab?
          </h2>
          <p>
            Every action we take leaves a mark, whether good or bad. Kitaab, an
            Islamic app, helps you capture your daily good deeds Hasanaat and
            bad deeds Sayyi&apos;at in one simple, meaningful record. By
            tracking your deeds, you gain insight into your choices and growth,
            turning everyday actions into visible progress.
          </p>
          <p>
            But Kitaab is more than just recording deeds. It gives purpose to
            your routine, helping you reflect, improve, and grow spiritually and
            morally. With Kitaab, you don&apos;t just track your day, you
            understand why it matters and how small actions shape the bigger
            story of your life.
          </p>
        </div>
      </div>
    </section>
  );
}

