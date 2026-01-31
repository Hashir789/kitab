"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.css";
import Toast from "./toast/Toast";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [count, setCount] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [validationError, setValidationError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length > 5;
  };

  const fetchCount = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      timeoutRef.current = timeoutId;

      const response = await fetch("/api/waitlist", {
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);
      timeoutRef.current = null;

      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Failed to fetch count:', error);
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchCount();

    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchCount]);

  const showToastNotification = (title: string, message: string, type: "success" | "error" = "success") => {
    setToastTitle(title);
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Instant validation - show error immediately while typing
    if (!value) {
      setValidationError("");
    } else if (!isValidEmail(value)) {
      setValidationError("Please enter a valid email address");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      setValidationError("Please enter a valid email address");
      showToastNotification("Invalid email", "Please enter a valid email address", "error");
      return;
    }

    setStatus("loading");
    setValidationError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("idle");
        setEmail("");
        setValidationError("");
        // Update count if provided in response, otherwise fetch it
        if (typeof data.count === 'number') {
          setCount(data.count);
        } else {
          fetchCount();
        }
        showToastNotification(
          "You're on the waitlist.",
          "We'll notify you when Kitaab is ready."
        );
      } else {
        setStatus("idle");
        const errorMsg = data.error || "Something went wrong. Please try again.";
        
        if (errorMsg.toLowerCase().includes("already") || errorMsg.toLowerCase().includes("registered")) {
          setEmail("");
          setValidationError("");
          // Update count if provided in response
          if (typeof data.count === 'number') {
            setCount(data.count);
          } else {
            fetchCount();
          }
          showToastNotification(
            "You're on the waitlist.",
            "We'll notify you when Kitaab is ready."
          );
        } else {
          setValidationError(errorMsg);
          showToastNotification("Error", errorMsg, "error");
        }
      }
    } catch (error) {
      setStatus("idle");
      const errorMsg = "Failed to submit. Please try again.";
      setValidationError(errorMsg);
      showToastNotification("Error", errorMsg, "error");
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        onClose={handleToastClose}
      />
      <div className={styles.waitlist}>
        <form onSubmit={handleSubmit} className={styles.waitlistRow}>
          <input
            type="email"
            className={styles.waitlistInput}
            placeholder="test@mail.com"
            aria-label="Email for waitlist"
            aria-describedby="waitlist-helper"
            value={email}
            onChange={handleEmailChange}
            disabled={status === "loading"}
            required
          />
          <button
            className={styles.waitlistButton}
            type="submit"
            disabled={status === "loading" || !email || !isValidEmail(email)}
          >
            {status === "loading" ? "Submitting..." : "Notify Me"}
          </button>
        </form>
        <p className={styles.waitlistHelper} id="waitlist-helper">
          {validationError ? (
            validationError
          ) : count !== null ? (
            `${count} ${count === 1 ? "person has" : "people have"} joined the waitlist${count > 0 ? " so far" : ""}.`
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
}
