import React from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
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
          <BiSolidQuoteAltLeft aria-hidden="true" className={styles.quoteIconLeft} />
          <p>
            With dedicated Hasanaat (good deeds) and Sayyi&apos;at (bad deeds) sections, Kitaab allows you to track all your daily deeds — beyond salah and routine worship. By recording both positive actions and shortcomings, you build awareness, reflect with honesty, and create a clear path toward steady self-improvement.
          </p>
          <div className={styles.introLabel}>— Why Kitaab</div>
          <BiSolidQuoteAltRight aria-hidden="true" className={styles.quoteIconRight} />
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
