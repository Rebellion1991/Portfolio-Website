import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date range as a string
 * @param startDate - Start date in ISO format (YYYY-MM-DD)
 * @param endDate - End date in ISO format (YYYY-MM-DD) or null for "Present"
 * @returns Formatted date range string (e.g., "Jan 2020 - Present")
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  if (!endDate) {
    return `${startFormatted} - Present`
  }

  const end = new Date(endDate)
  const endFormatted = end.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  return `${startFormatted} - ${endFormatted}`
}
