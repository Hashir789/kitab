"use client";

import PrayerChart from "./PrayerChart";
import TimeSeriesChart from "./TimeSeriesChart";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaCaretDown } from "react-icons/fa";
import styles from "./prayerchart.module.css";

const groupButtons = ["Hasanaat", "Sayyiaat"];
const dropdownOptions = ["All", "Fajar", "Zuhr", "Asr", "Maghrib", "Isha"] as const;
type DropdownOption = (typeof dropdownOptions)[number];

export default function PrayerChartClient() {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; right: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const prevSlideRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const pausedAtMsRef = useRef<number | null>(null);
  const manualClickRef = useRef<boolean>(false);
  const manualSlideRef = useRef<number | null>(null);

  const handleSlideClick = (slideIndex: number) => {
    // Set manual click flag and track the intended slide IMMEDIATELY
    // This must happen before any state updates to prevent race conditions
    manualClickRef.current = true;
    manualSlideRef.current = slideIndex;
    prevSlideRef.current = slideIndex;
    
    // Reset timer to sync with the selected slide FIRST
    // If clicking Hasanaat (0), start at 0 seconds
    // If clicking Sayyiaat (1), start at 5 seconds (halfway through the cycle)
    const baseTime = slideIndex === 0 ? 0 : 5;
    startTimeRef.current = Date.now() - (baseTime * 1000);
    
    // Now update state - this ensures the timer is already set correctly
    setCurrentSlide(slideIndex);
    setProgress(0);
    
    // Clear the manual click flag after a delay, but keep manualSlideRef longer
    // This prevents the automatic transition from overriding the manual click
    setTimeout(() => {
      manualClickRef.current = false;
    }, 400);
    
    // Keep the manual slide reference even longer to ensure smooth transition
    setTimeout(() => {
      manualSlideRef.current = null;
    }, 500);
  };

  // Close dropdown when slide changes to Sayyiaat (slide 1)
  useEffect(() => {
    if (currentSlide === 1 && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [currentSlide, isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(`.${styles.dropdownMenu}`)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen && dropdownButtonRef.current) {
      document.addEventListener("mousedown", handleClickOutside);
      const buttonRect = dropdownButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + 10,
        right: window.innerWidth - buttonRect.right - 15
      });
    } else {
      setDropdownPosition(null);
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
      if (isPausedRef.current) {
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }
      
      // Check for manual slide reference FIRST - this takes highest priority
      if (manualSlideRef.current !== null) {
        const intendedSlide = manualSlideRef.current;
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const cycleTime = elapsed % 10;
        
        // Calculate progress based on intended slide
        let newProgress = 0;
        if (intendedSlide === 0) {
          // Hasanaat: 0-5 seconds
          newProgress = cycleTime < 5 ? (cycleTime / 5) * 100 : 100;
        } else {
          // Sayyiaat: 5-10 seconds
          if (cycleTime < 5) {
            // If we're still in the first half, keep progress at 0
            newProgress = 0;
          } else {
            newProgress = ((cycleTime - 5) / 5) * 100;
          }
        }
        
        // Force the slide to stay on the intended slide
        setCurrentSlide(intendedSlide);
        setProgress(newProgress);
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }
      
      // Don't update if a manual click just happened (backup check)
      if (manualClickRef.current) {
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }
      
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const cycleTime = elapsed % 10;
      
      let newProgress = 0;
      let newSlide = 0;
      
      if (cycleTime < 5) {
        newProgress = (cycleTime / 5) * 100;
        newSlide = 0;
      } else {
        newProgress = ((cycleTime - 5) / 5) * 100;
        newSlide = 1;
      }
      
      if (newSlide !== prevSlideRef.current) {
        setShouldTransition(true);
        prevSlideRef.current = newSlide;
        setTimeout(() => setShouldTransition(false), 350);
      }
      
      setCurrentSlide(newSlide);
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
    <div
      className={styles.chartContainer}
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
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.chartContainerFooter}>
        <div className={styles.namazDropdownWrapper}>
          <div 
            className={styles.namazDropdownSlider}
            style={{ 
              transform: `translateX(-${(1 - currentSlide) * 50}%)`
            }}
          >
            <div className={styles.namazDropdownSlide}>
              <div className={styles.groupButtonContainerBeta}>
                <div className={styles.falseSpeakingLabel}>False Speaking</div>
              </div>
            </div>
            <div className={styles.namazDropdownSlide}>
              <div className={styles.groupButtonContainerBeta} ref={dropdownRef}>
                <button className={styles.groupButtonBeta}>Namaz</button>
                <div className={styles.dropdownWrapper}>
                  <button
                    ref={dropdownButtonRef}
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
                  {isDropdownOpen && dropdownPosition && typeof window !== 'undefined' && createPortal(
                    <ul 
                      className={styles.dropdownMenu} 
                      role="listbox"
                      style={{
                        position: 'fixed',
                        top: `${dropdownPosition.top}px`,
                        right: `${dropdownPosition.right}px`
                      }}
                    >
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
                    </ul>,
                    document.body
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.groupButtonContainer}
          style={{ "--active-left": `${currentSlide === 0 ? 5 : 108}px` } as any}
          aria-label="Toggle between viewing good deeds and bad deeds"
        >
          {groupButtons.map((label, index) => (
            <button
              type="button"
              key={label}
              onClick={() => handleSlideClick(index)}
              className={`${styles.groupButton} ${
                styles[`groupButton${index + 1}`]
              } ${
                (currentSlide === 0 && index === 0) || (currentSlide === 1 && index === 1)
                  ? styles.groupButtonActive
                  : ""
              }`}
              aria-pressed={
                (currentSlide === 0 && index === 0) || (currentSlide === 1 && index === 1)
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.chartContainerSliderWrapper} aria-label="Prayer tracking charts">
        <div 
          className={styles.chartContainerSlider}
          style={{ 
            transform: `translateX(-${(1 - currentSlide) * 50}%)`
          }}
        >
          <div className={`${styles.carouselSlide} ${styles.margin10}`} aria-label="False speaking tracking chart">
            <TimeSeriesChart />
          </div>
          <div className={styles.carouselSlide} aria-label="Prayer tracking chart">
            <PrayerChart selectedPrayer={selectedOption} />
          </div>
        </div>
      </div>
    </div>
  );
}
