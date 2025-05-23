"use client"

import type React from "react"

export function SkipLink() {
  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={handleSkipToMain}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSkipToMain(e as any)
        }
      }}
    >
      Skip to main content
    </a>
  )
}
