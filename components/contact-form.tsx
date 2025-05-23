"use client";

import React, { useState, useId, useEffect } from "react";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/app/actions";
import type { ContactFormState } from "@/app/actions";
import { Input } from "@/components/ui/input";
import {
  FormLabel,
  FormMessage,
  FormDescription,
  FormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

export function ContactForm() {
  const [formState, formAction] = useActionState(
    submitContactForm,
    initialState
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const csrfToken = useId();

  useEffect(() => {
    window.__FORM_RENDERED_AT = Date.now();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // Add security fields
      const renderTime =
        window.__FORM_RENDERED_AT?.toString() || Date.now().toString();
      formData.append("formRenderedAt", renderTime);
      formData.append("website", ""); // Honeypot
      formData.append("csrfToken", csrfToken); // Add CSRF token directly
      await formAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formState.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl p-8 border shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. I'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-full"
          >
            Send Another Message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl p-8 border shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold mb-2">
          Send me a message
        </h2>
        <p className="text-muted-foreground">
          Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>{" "}
      <form action={handleSubmit} className="space-y-6" noValidate>
        <input type="hidden" name="csrfToken" value={csrfToken} />

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Leave this empty: <input type="text" name="website" />
          </label>
        </div>

        {formState.message && !formState.success && (
          <Alert variant="destructive" role="alert">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FormField>
              <FormLabel htmlFor="name" required>
                Full Name
              </FormLabel>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                required
                className={cn(
                  "h-12 rounded-lg border-2 focus:border-primary transition-colors",
                  formState.errors?.name && "border-destructive"
                )}
                aria-describedby={
                  formState.errors?.name ? "name-error" : undefined
                }
                aria-invalid={!!formState.errors?.name}
              />
              {formState.errors?.name && (
                <FormMessage id="name-error" type="error">
                  {formState.errors.name[0]}
                </FormMessage>
              )}
            </FormField>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FormField>
              <FormLabel htmlFor="email" required>
                Email Address
              </FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className={cn(
                  "h-12 rounded-lg border-2 focus:border-primary transition-colors",
                  formState.errors?.email && "border-destructive"
                )}
                aria-describedby={
                  formState.errors?.email ? "email-error" : undefined
                }
                aria-invalid={!!formState.errors?.email}
              />
              {formState.errors?.email && (
                <FormMessage id="email-error" type="error">
                  {formState.errors.email[0]}
                </FormMessage>
              )}
            </FormField>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormField>
            <FormLabel htmlFor="subject" required>
              Subject
            </FormLabel>
            <Input
              id="subject"
              name="subject"
              placeholder="What's this about?"
              required
              className={cn(
                "h-12 rounded-lg border-2 focus:border-primary transition-colors",
                formState.errors?.subject && "border-destructive"
              )}
              aria-describedby={
                formState.errors?.subject ? "subject-error" : undefined
              }
              aria-invalid={!!formState.errors?.subject}
            />
            {formState.errors?.subject && (
              <FormMessage id="subject-error" type="error">
                {formState.errors.subject[0]}
              </FormMessage>
            )}
          </FormField>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FormField>
            <FormLabel htmlFor="message" required>
              Message
            </FormLabel>
            <FormDescription>
              Tell me about your project or inquiry in detail.
            </FormDescription>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or inquiry..."
              rows={6}
              required
              className={cn(
                "rounded-lg border-2 focus:border-primary transition-colors resize-none",
                formState.errors?.message && "border-destructive"
              )}
              aria-describedby={
                formState.errors?.message
                  ? "message-error message-description"
                  : "message-description"
              }
              aria-invalid={!!formState.errors?.message}
            />
            {formState.errors?.message && (
              <FormMessage id="message-error" type="error">
                {formState.errors.message[0]}
              </FormMessage>
            )}
          </FormField>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-full text-base font-medium focus-visible-ring"
            aria-describedby={isSubmitting ? "submit-status" : undefined}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span id="submit-status">Sending Message...</span>
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
