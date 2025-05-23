"use client"

import { useEffect, useState } from "react"

interface AccessibilityAnnouncerProps {
  message: string
  priority?: "polite" | "assertive"
}

export function AccessibilityAnnouncer({ message, priority = "polite" }: AccessibilityAnnouncerProps) {
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      // Clear the announcement after a short delay to allow for re-announcements
      const timer = setTimeout(() => setAnnouncement(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div
      className="sr-only"
      aria-live={priority}
      aria-atomic="true"
      role={priority === "assertive" ? "alert" : "status"}
    >
      {announcement}
    </div>
  )
}
