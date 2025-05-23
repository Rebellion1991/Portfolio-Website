"use server";

import { z } from "zod";
import { contactFormSchema } from "@/lib/validations/contact";
import { sendEmail } from "@/lib/brevo";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    // Apply rate limiting (5 attempts per hour)
    const rateLimitResult = await rateLimit(
      `contact-${ip}`,
      5,
      60 * 60 // 1 hour window
    );

    if (!rateLimitResult.success) {
      return {
        success: false,
        message: "Too many attempts. Please try again later.",
      };
    }

    // Parse and validate form data
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = contactFormSchema.safeParse(rawData);
    if (!validatedData.success) {
      console.log("Validation failed:", validatedData.error);

      // Group errors by field
      const errors: Record<string, string[]> = {};
      validatedData.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(issue.message);
      });

      return {
        success: false,
        message: "Please check the form for errors.",
        errors: errors as ContactFormState["errors"],
      };
    }

    const { name, email, subject, message } = validatedData.data;

    // Send email using Brevo
    await sendEmail({
      to: process.env.CONTACT_EMAIL || "contact@shenawy.xyz",
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });

    // Send auto-response to user
    await sendEmail({
      to: email,
      subject: "Thank you for contacting Ahmed Shenawy",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out. I have received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Ahmed Shenawy</p>
      `,
    });

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
