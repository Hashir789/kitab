import React from "react";
import styles from "./WhatIsKitaab.module.css";

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
            ﮭ ﮮ ﮯ ﮰ ﮱ ﯓ ﯔ
          </span>

          <p className={styles.translation}>
            Read your <strong>kitaab</strong>. You yourself are sufficient as your accountant today.
          </p>

          <p className={styles.ayahReference}>Al Qur'an 17:14</p>
        </div>

        <div className={styles.right}>
          <h2 id="what-is-kitaab-heading" className={styles.heading}>
            What is <span className={styles.kitaabHighlight}>Kitaab</span>
          </h2>
          <p>
            Every action we take leaves a mark, whether good or bad. Most of them pass unnoticed, blending into ordinary days. But the moment you begin to record them, your perspective shifts. Patterns become clear. Choices become visible. And awareness becomes the first step toward growth.
          </p>
          <p>
            Inspired by the concept of <em>Amaal Naama</em>, the Book of Deeds, Kitaab is a simple tracking app that brings this timeless idea into your daily life. It offers a private space for honest accountability, where every small good is valued and every mistake becomes an opportunity to reflect, correct, and improve.
          </p>
        </div>
      </div>
    </section>
  );
}

