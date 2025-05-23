"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { Menu, X } from "lucide-react";

const routes = [
  { name: "About", path: "/" },
  { name: "Experience", path: "/experience" },
  { name: "Education", path: "/education" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when escape is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight hover:text-primary transition-colors focus-visible-ring rounded-md px-2 py-1"
              aria-label="Ahmed Shenawy - Home"
            >
              <img src="/fav.png" alt="AS Logo" className="h-8 w-auto" />
              <span>Ahmed Shenawy</span>
            </Link>
          </motion.div>

          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {routes.map((route, index) => (
              <motion.div
                key={route.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={route.path}
                  className={`relative text-sm font-medium transition-colors hover:text-primary focus-visible-ring rounded-md px-3 py-2 ${
                    isActive(route.path)
                      ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary"
                      : "text-muted-foreground"
                  }`}
                  aria-current={isActive(route.path) ? "page" : undefined}
                >
                  {route.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted focus-visible-ring touch-target"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </motion.div>
        </div>
      </header>
      <div className="h-16" aria-hidden="true"></div>{" "}
      {/* Spacer for fixed header */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        routes={routes}
        id="mobile-menu"
      />
    </>
  );
}
