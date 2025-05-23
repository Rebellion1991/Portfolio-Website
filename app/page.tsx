import type { Metadata } from "next";
import AboutClientPage from "./about/AboutClientPage";

export const metadata: Metadata = {
  title: "Ahmed Shenawy - Mobile Network Specialist",
  description:
    "Personal portfolio of Ahmed Shenawy, specializing in Mobile Core Network Services and Roaming Services optimization.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <AboutClientPage />;
}
