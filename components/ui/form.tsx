"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    )
  },
)
FormLabel.displayName = "FormLabel"

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "success" | "warning" | "info"
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, type = "error", children, ...props }, ref) => {
    if (!children) return null

    return (
      <p
        ref={ref}
        className={cn(
          "text-sm font-medium",
          {
            "text-destructive": type === "error",
            "text-green-600": type === "success",
            "text-yellow-600": type === "warning",
            "text-blue-600": type === "info",
          },
          className,
        )}
        role={type === "error" ? "alert" : "status"}
        aria-live={type === "error" ? "assertive" : "polite"}
        {...props}
      >
        {children}
      </p>
    )
  },
)
FormMessage.displayName = "FormMessage"

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  },
)
FormDescription.displayName = "FormDescription"
