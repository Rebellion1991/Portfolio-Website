import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Ahmed Shenawy - Mobile Network Specialist",
  description:
    "Personal portfolio of Ahmed Shenawy, specializing in Mobile Core Network Services and Roaming Services optimization.",
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  return <ClientPage />
}
