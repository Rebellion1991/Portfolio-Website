import type { Metadata } from "next"
import CoursesPageClient from "./CoursesPageClient"

export const metadata: Metadata = {
  title: "Courses & Certifications - Ahmed Shenawy",
  description: "Professional courses and certifications in telecommunications, networking, and related fields",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses & Certifications - Ahmed Shenawy",
    description: "Professional courses and certifications in telecommunications, networking, and related fields",
    url: "/courses",
    type: "website",
  },
}

export default function CoursesPage() {
  return <CoursesPageClient />
}
