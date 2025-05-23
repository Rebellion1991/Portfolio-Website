// Define TypeScript interfaces for all content types

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null // null means "Present"
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
}

export interface Education {
  id: string
  degree: string
  field: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
  achievements?: string[]
}

export interface Course {
  id: string
  title: string
  provider: string
  certificateUrl?: string
  completionDate: string
  description?: string
  skills: string[]
  category: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  date: string
  category: string
}

export interface Profile {
  name: string
  title: string
  summary: string
  location: string
  email: string
  phone?: string
  website: string
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
    [key: string]: string | undefined
  }
  skills: {
    category: string
    items: string[]
  }[]
}
