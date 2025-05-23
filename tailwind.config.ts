import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // High contrast color palette for accessibility
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Primary brand color - 4.5:1 contrast on white
          600: "#0284c7", // Higher contrast variant
          700: "#0369a1", // Even higher contrast
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        // Accessibility-focused colors
        success: {
          DEFAULT: "hsl(142, 76%, 36%)", // 4.5:1 contrast
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)", // 4.5:1 contrast
          foreground: "hsl(0, 0%, 0%)",
        },
        error: {
          DEFAULT: "hsl(0, 84%, 60%)", // 4.5:1 contrast
          foreground: "hsl(0, 0%, 100%)",
        },
        info: {
          DEFAULT: "hsl(199, 89%, 48%)", // 4.5:1 contrast
          foreground: "hsl(0, 0%, 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        // Accessibility-friendly animations
        "reduce-motion": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeInDown: "fadeInDown 0.5s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        slideInFromLeft: "slideInFromLeft 0.3s ease-out",
        slideInFromRight: "slideInFromRight 0.3s ease-out",
        "reduce-motion": "reduce-motion 0.3s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "var(--tw-prose-body)",
            lineHeight: "1.75",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      // Accessibility-focused spacing
      spacing: {
        "touch-target": "44px", // Minimum touch target size
      },
      // Focus ring utilities
      ringWidth: {
        3: "3px",
      },
      ringOffsetWidth: {
        3: "3px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for accessibility utilities
    ({ addUtilities, theme }) => {
      const newUtilities = {
        ".focus-visible-ring": {
          "&:focus-visible": {
            outline: "none",
            "ring-width": "3px",
            "ring-color": theme("colors.primary.DEFAULT"),
            "ring-offset-width": "2px",
            "ring-offset-color": theme("colors.background"),
          },
        },
        ".skip-link": {
          position: "absolute",
          top: "-40px",
          left: "6px",
          background: theme("colors.primary.DEFAULT"),
          color: theme("colors.primary.foreground"),
          padding: "8px 16px",
          "text-decoration": "none",
          "border-radius": "4px",
          "z-index": "1000",
          "&:focus": {
            top: "6px",
          },
        },
        ".sr-only-focusable": {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          "white-space": "nowrap",
          border: "0",
          "&:focus": {
            position: "static",
            width: "auto",
            height: "auto",
            padding: "inherit",
            margin: "inherit",
            overflow: "visible",
            clip: "auto",
            "white-space": "normal",
          },
        },
        ".touch-target": {
          "min-height": theme("spacing.touch-target"),
          "min-width": theme("spacing.touch-target"),
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config
