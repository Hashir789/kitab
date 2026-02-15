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
            Every action we take leaves a mark, whether good or bad. Kitaab is a personal Islamic app that helps you record your daily good and bad deeds in one meaningful place. By making your actions visible, it helps you reflect on your choices and see your growth more clearly.
          </p>
          <p>
            But Kitaab is more than a record. It brings intention to your routine, helping you pause, improve, and grow spiritually and morally. Because small actions, repeated daily, shape who you become.
          </p>
        </div>
      </div>
    </section>
  );
}

