"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  routes: { name: string; path: string }[]
  id: string
}

export function MobileMenu({ isOpen, onClose, routes, id }: MobileMenuProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent scrolling when menu is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Focus the close button when menu opens
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }

      // Trap focus within the menu
      if (e.key === "Tab") {
        const focusableElements = menuRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id={id}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="container h-full flex flex-col">
            <div className="flex justify-between pt-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight hover:text-primary transition-colors focus-visible-ring rounded-md px-2 py-1"
                aria-label="Ahmed Shenawy - Home"
              >
                <img src="/fav.png" alt="AS Logo" className="h-8 w-auto" />
                <span>Ahmed Shenawy</span>
              </Link>
              <motion.button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted focus-visible-ring touch-target"
                aria-label="Close menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <nav
              role="navigation"
              aria-label="Mobile navigation"
              className="flex-1 flex flex-col justify-center items-center"
            >
              <motion.ul
                className="space-y-8 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="list"
              >
                {routes.map((route) => (
                  <motion.li key={route.path} variants={itemVariants} role="listitem">
                    <Link
                      href={route.path}
                      className={`text-2xl font-serif font-medium transition-colors hover:text-primary focus-visible-ring rounded-md px-4 py-2 block ${
                        isActive(route.path) ? "text-primary" : "text-foreground"
                      }`}
                      onClick={onClose}
                      aria-current={isActive(route.path) ? "page" : undefined}
                    >
                      {route.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
