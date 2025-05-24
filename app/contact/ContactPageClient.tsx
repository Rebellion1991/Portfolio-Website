"use client";

import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { ContactHero } from "@/components/contact-hero";
import type { Profile } from "@/lib/types";

interface ContactPageClientProps {
  profile: Profile;
}

export function ContactPageClient({ profile }: ContactPageClientProps) {
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
  );
}
