/**
 * @fileoverview Type definitions for the portfolio website
 * @module lib/types
 */

/**
 * Profile information including personal details and skills
 * @interface Profile
 */
export interface Profile {
  /** Full name */
  name: string;
  /** Professional title */
  title: string;
  /** Brief professional summary */
  summary: string;
  /** Detailed professional background */
  professionalBackground: string;
  /** Current location */
  location: string;
  /** Contact email */
  email: string;
  /** Personal website URL */
  website: string;
  /** Social media links */
  socialLinks: {
    /** LinkedIn profile URL */
    linkedin: string;
    /** GitHub profile URL */
    github?: string; // Added github as an optional property
  };
  /** Professional skills by category */
  skills: Skill[];
}

/**
 * Skill category with related skills
 * @interface Skill
 */
export interface Skill {
  /** Skill category name */
  category: string;
  /** List of skills in this category */
  items: string[];
}

// Define TypeScript interfaces for all content types

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null means "Present"
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  certificateUrl?: string;
  completionDate: string;
  description?: string;
  skills: string[];
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
  category: string;
}
