/**
 * @fileoverview Content management utilities for fetching and processing JSON content
 * @module lib/content
 */

import type { Experience, Education, Course, Project, Profile } from "./types";

// Get profile data
export async function getProfile(): Promise<Profile> {
  const profile = await import("../content/profile.json");
  return profile.default;
}

/**
 * Fetches and returns the profile data from profile.json
 * @async
 * @returns {Promise<Profile>} Profile data including personal info and skills
 */

// Get all experiences
export async function getExperiences(): Promise<Experience[]> {
  const experiences = await import("../content/experiences.json");
  return experiences.default;
}

/**
 * Fetches and returns professional experience data from experiences.json
 * @async
 * @returns {Promise<Experience[]>} Array of professional experiences
 */

// Get all education entries
export async function getEducation(): Promise<Education[]> {
  const education = await import("../content/education.json");
  return education.default;
}

/**
 * Fetches and returns education history from education.json
 * @async
 * @returns {Promise<Education[]>} Array of education entries
 */

// Get all courses
export async function getCourses(): Promise<Course[]> {
  const courses = await import("../content/courses.json");
  return courses.default;
}

/**
 * Fetches and returns course data from courses.json
 * @async
 * @returns {Promise<Course[]>} Array of courses and certifications
 */

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const projects = await import("../content/projects.json");
  return projects.default;
}

/**
 * Fetches and returns project data from projects.json
 * @async
 * @returns {Promise<Project[]>} Array of portfolio projects
 */

// Get courses by category
export async function getCoursesByCategory(
  category: string
): Promise<Course[]> {
  const courses = await getCourses();
  return courses.filter((course) => course.category === category);
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}

// Get projects by category
export async function getProjectsByCategory(
  category: string
): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.category === category);
}
