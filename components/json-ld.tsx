import type { Profile } from "@/lib/types";

interface PersonJsonLdProps {
  profile: Profile;
}

export function PersonJsonLd({ profile }: PersonJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shenawy.xyz";

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: baseUrl,
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    email: profile.email,
    sameAs: [profile.socialLinks.linkedin, profile.socialLinks.github].filter(
      Boolean
    ),
    knowsAbout: profile.skills.flatMap((skillCategory) => skillCategory.items),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      key="person-jsonld"
    />
  );
}

interface WebsiteJsonLdProps {
  profile: Profile;
}

export function WebsiteJsonLd({ profile }: WebsiteJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shenawy.xyz";

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} - Personal Portfolio`,
    url: baseUrl,
    description: profile.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      key="website-jsonld"
    />
  );
}
