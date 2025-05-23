"use client";

import { useId } from "react";
import type { FC } from "react";

/**
 * Provides CSRF protection for forms
 * Generates a unique token for each session
 */
export const CsrfProvider: FC = () => {
  const token = useId();
  return <input type="hidden" name="csrf_token" value={token} />;
};
