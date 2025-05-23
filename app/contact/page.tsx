import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactHero } from "@/components/contact-hero"
import { getProfile } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contact - Ahmed Shenawy",
  description: "Get in touch with Ahmed Shenawy for inquiries about mobile network optimization and telecommunications",
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
}

export default async function ContactPage() {
  const profile = await getProfile()

  return (
    <main>
      <ContactHero />

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo profile={profile} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
