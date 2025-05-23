import type { Metadata } from "next"
import EducationPageClient from "./EducationPageClient"

export const metadata: Metadata = {
  title: "Education - Ahmed Shenawy",
  description: "Academic background and qualifications in telecommunications and electrical engineering",
  alternates: {
    canonical: "/education",
  },
  openGraph: {
    title: "Education - Ahmed Shenawy",
    description: "Academic background and qualifications in telecommunications and electrical engineering",
    url: "/education",
    type: "website",
  },
}

export default function EducationPage() {
  return <EducationPageClient />
}
