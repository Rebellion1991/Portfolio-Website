import type { Metadata } from "next"
import ExperiencePageClient from "./ExperiencePageClient"

export const metadata: Metadata = {
  title: "Professional Experience - Ahmed Shenawy",
  description: "Timeline of my professional experience in mobile core network and roaming services",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Professional Experience - Ahmed Shenawy",
    description: "Timeline of my professional experience in mobile core network and roaming services",
    url: "/experience",
    type: "website",
  },
}

export default function ExperiencePage() {
  return <ExperiencePageClient />
}
