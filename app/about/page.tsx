import { Suspense } from "react"
import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"
import { Skeleton } from "@/components/ui/skeleton"

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

function AboutFallback() {
  return (
    <div className="container py-20">
      <Skeleton className="h-[300px] rounded-2xl mb-8" />
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-[200px] rounded-xl" />
        <Skeleton className="h-[200px] rounded-xl" />
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutFallback />}>
      <AboutClientPage />
    </Suspense>
  )
}
