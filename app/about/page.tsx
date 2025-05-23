import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Me - Ahmed Shenawy",
  description: "Learn more about my background, skills, and interests in mobile network optimization",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Me - Ahmed Shenawy",
    description: "Learn more about my background, skills, and interests in mobile network optimization",
    url: "/about",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
