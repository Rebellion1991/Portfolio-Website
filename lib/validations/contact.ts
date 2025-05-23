import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .refine((name) => /^[a-zA-Z\s-']+$/.test(name), {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .transform((email) => email.toLowerCase())
    .transform((email) => email.trim())
    .transform((email) => email.replace(/[<>]/g, "")), // Sanitize email
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters")
    .transform((subject) => subject.trim())
    .transform((subject) => subject.replace(/[<>]/g, "")), // Sanitize subject
  message: z
    .string()
    .min(2, "Message is required")
    .max(5000, "Message must be less than 5000 characters")
    .transform((message) => message.trim())
    .transform((message) => message.replace(/[<>]/g, "")), // Sanitize message
  website: z.string().max(0, "Nice try, bot!"), // Honeypot field
  formRenderedAt: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (timestamp) => {
        // Basic sanity check for the timestamp
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000; // 24 hours ago
        return timestamp >= oneDayAgo && timestamp <= now + 60000; // Allow 1 minute future tolerance
      },
      {
        message: "Invalid form submission time. Please try again.",
      }
    ),
  csrfToken: z.string().min(1, "CSRF token is required"),
});
