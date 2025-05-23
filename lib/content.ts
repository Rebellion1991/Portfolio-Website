import fs from "fs"
import path from "path"
import type { Experience, Education, Course, Project, Profile } from "./types"

// Base content directory
const contentDirectory = path.join(process.cwd(), "content")

// Helper function to read and parse JSON files
export async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(contentDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  return JSON.parse(fileContents) as T
}

// Get profile data
export async function getProfile(): Promise<Profile> {
  return readJsonFile<Profile>("profile.json")
}

// Get all experiences
export async function getExperiences(): Promise<Experience[]> {
  const experiences = await readJsonFile<Experience[]>("experiences.json")
  // Sort by date (most recent first)
  return experiences.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateB - dateA
  })
}

// Get all education entries
export async function getEducation(): Promise<Education[]> {
  const education = await readJsonFile<Education[]>("education.json")
  // Sort by date (most recent first)
  return education.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateB - dateA
  })
}

// Get all courses
export async function getCourses(): Promise<Course[]> {
  const courses = await readJsonFile<Course[]>("courses.json")
  // Sort by completion date (most recent first)
  return courses.sort((a, b) => {
    const dateA = new Date(a.completionDate).getTime()
    const dateB = new Date(b.completionDate).getTime()
    return dateB - dateA
  })
}

// Get courses by category
export async function getCoursesByCategory(category: string): Promise<Course[]> {
  const courses = await getCourses()
  return courses.filter((course) => course.category === category)
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const projects = await readJsonFile<Project[]>("projects.json")
  // Sort by date (most recent first)
  return projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((project) => project.featured)
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((project) => project.category === category)
}
