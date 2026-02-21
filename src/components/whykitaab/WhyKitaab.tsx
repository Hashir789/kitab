"use client";

import React, { useState, useEffect, useRef } from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import styles from "./WhyKitaab.module.css";

export default function WhyKitaabSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const isPausedRef = useRef<boolean>(false);
  const pausedAtMsRef = useRef<number | null>(null);
  const lastSlideRef = useRef<number>(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    lastSlideRef.current = index;
    startTimeRef.current = Date.now() - (index * 5000);
    if (pausedAtMsRef.current) {
      pausedAtMsRef.current = null;
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    const updateSlide = () => {
      if (!isActive) return;
      if (isPausedRef.current) {
        animationFrameId = requestAnimationFrame(updateSlide);
        return;
      }

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const cycleTime = elapsed % 20; // 4 slides * 5 seconds = 20 seconds total
      const newSlide = Math.floor(cycleTime / 5);
      
      if (newSlide !== lastSlideRef.current) {
        setCurrentSlide(newSlide);
        lastSlideRef.current = newSlide;
      }
      
      animationFrameId = requestAnimationFrame(updateSlide);
    };

    animationFrameId = requestAnimationFrame(updateSlide);

    return () => {
      isActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const slides = [
    {
      text: "With dedicated Hasanaat and Sayyi’at sections, Kitaab helps you track your daily deeds beyond salah and routine worship. By recording both good actions and shortcomings, you build awareness, reflect honestly, and move toward consistent self-improvement.",
    },
    {
      text: "Your records are fully private. Kitaab uses end-to-end encryption so that even the database administrators cannot access your deeds, giving you complete peace of mind.",
    },
    {
      text: "Set personal goals, celebrate your achievements, and track your spiritual progress. Kitaab helps you stay focused, do more good deeds, and bring positivity into your daily life.",
    },
    {
      text: "Kitaab can analyze your habits, highlight patterns, and provide personalized suggestions to help you improve consistently. With guidance from Kitaab, you gain deeper insight into your actions and make smarter choices every day.",
    }
  ];

  return (
    <section
      id="why-kitaab"
      aria-labelledby="why-kitaab-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.leftWrapper}>
          <div 
            className={styles.carouselContainer}
            onMouseEnter={() => {
              isPausedRef.current = true;
              pausedAtMsRef.current = Date.now();
            }}
            onMouseLeave={() => {
              if (pausedAtMsRef.current) {
                const pausedForMs = Date.now() - pausedAtMsRef.current;
                startTimeRef.current += pausedForMs;
              }
              pausedAtMsRef.current = null;
              isPausedRef.current = false;
            }}
          >
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <BiSolidQuoteAltLeft aria-hidden="true" className={styles.quoteIconLeft} />
                  <p>{slide.text}</p>
                  <div className={styles.introLabel}>— The Need for Kitaab</div>
                  <BiSolidQuoteAltRight aria-hidden="true" className={styles.quoteIconRight} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.progressDotsContainer}>
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                className={`${styles.progressDot} ${currentSlide === index ? styles.progressDotActive : ''}`}
                aria-label={`View slide ${index + 1}`}
                aria-pressed={currentSlide === index}
              />
            ))}
          </div>
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
