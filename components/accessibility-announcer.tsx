"use client";

import { useEffect, useState } from "react";

interface AccessibilityAnnouncerProps {
  message: string;
  priority?: "polite" | "assertive";
}

export function AccessibilityAnnouncer({
  message,
  priority = "polite",
}: AccessibilityAnnouncerProps) {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      // Clear the announcement after a short delay to allow for re-announcements
      const timer = setTimeout(() => setAnnouncement(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Update ARIA attributes dynamically via useEffect
  useEffect(() => {
    const announcerEl = document.querySelector(
      "[data-accessibility-announcer]"
    ) as HTMLElement;
    if (announcerEl) {
      announcerEl.setAttribute("aria-live", priority);
      announcerEl.setAttribute(
        "role",
        priority === "assertive" ? "alert" : "status"
      );
    }
  }, [priority]);

  return (
    <div
      className="sr-only"
      data-accessibility-announcer
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {announcement}
    </div>
  );
}
