import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact - Ahmed Shenawy",
  description:
    "Get in touch with Ahmed Shenawy for inquiries about mobile network optimization and telecommunications",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Ahmed Shenawy",
    description:
      "Get in touch with Ahmed Shenawy for inquiries about mobile network optimization and telecommunications",
    url: "/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const profile = await getProfile();

  return <ContactPageClient profile={profile} />;
}
