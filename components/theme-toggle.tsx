"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full touch-target" disabled>
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full touch-target focus-visible-ring"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            y: isDark ? -10 : 0,
            rotate: isDark ? -45 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : 10,
            rotate: isDark ? 0 : 45,
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
