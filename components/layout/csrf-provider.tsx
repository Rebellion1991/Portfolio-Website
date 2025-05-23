"use client";

import { useId } from "react";

/**
 * Provides CSRF protection for forms
 * Generates a unique token for each session
 */
export function CsrfProvider() {
  const token = useId();
  return <input type="hidden" name="csrf_token" value={token} />;
}
