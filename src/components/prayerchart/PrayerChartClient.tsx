"use client";

import PrayerChart from "./PrayerChart";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import styles from "./prayerchart.module.css";

const groupButtons = ["Hasanaat", "Sayyiaat"];
const dropdownOptions = ["All", "Fajar", "Zuhr", "Asr", "Maghrib", "Isha"] as const;
type DropdownOption = (typeof dropdownOptions)[number];

export default function PrayerChartClient() {
  const [Index, setIndex] = useState(true);
  const [selectedOption, setSelectedOption] = useState<DropdownOption>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => !prev);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    const updateProgress = () => {
      if (!isActive) return;
      
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const cycleTime = elapsed % 10;
      
      let newProgress = 0;
      if (cycleTime < 5) {
        newProgress = (cycleTime / 5) * 100;
      } else {
        newProgress = ((cycleTime - 5) / 5) * 100;
      }
      
      setProgress(newProgress);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    
    return () => {
      isActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.chartContainerFooter}>
        <div className={styles.groupButtonContainerBeta} ref={dropdownRef}>
          <button className={styles.groupButtonBeta}>Namaz</button>
          <div className={styles.dropdownWrapper}>
            <button
              type="button"
              className={`${styles.groupButtonDropdown} ${
                isDropdownOpen ? styles.groupButtonDropdownOpen : ""
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className={styles.dropdownLabel}>{selectedOption}</span>
              <FaCaretDown
                className={`${styles.dropdownCaret} ${
                  isDropdownOpen ? styles.dropdownCaretOpen : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu} role="listbox">
                {dropdownOptions.map((option) => (
                  <li
                    key={option}
                    className={styles.dropdownMenuItem}
                    onClick={() => {
                      setSelectedOption(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          className={styles.groupButtonContainer}
          style={{ "--active-left": `${Index ? 5 : 108}px` } as any}
          aria-label="Toggle between viewing good deeds and bad deeds"
        >
          {groupButtons.map((label, index) => (
            <button
              type="button"
              key={label}
              className={`${styles.groupButton} ${
                styles[`groupButton${index + 1}`]
              } ${
                (Index && index === 0) || (!Index && index === 1)
                  ? styles.groupButtonActive
                  : ""
              }`}
              aria-pressed={
                (Index && index === 0) || (!Index && index === 1)
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <PrayerChart selectedPrayer={selectedOption} />
    </div>
  );
}