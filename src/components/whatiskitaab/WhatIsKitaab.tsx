import React from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
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

          <BiSolidQuoteAltLeft aria-hidden="true" className={styles.quoteIconLeft} />
          <p>
            Every day, you make choices, but most go unrecorded. Without tracking them, improvement becomes unclear.
          </p>
          <p>
            Inspired by the concept of <em>Amaal Naama</em>, Book of Deeds, Kitaab is a personal deed tracking app that helps you track your deeds, reflect clearly, grow consistently, and improve every day.
          </p>
          <div className={styles.introLabel}>— Introduction to Kitaab</div>
          <BiSolidQuoteAltRight aria-hidden="true" className={styles.quoteIconRight} />
        </div>
      </div>
    </section>
  );
}

