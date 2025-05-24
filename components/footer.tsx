import Link from "next/link";
import type { Profile } from "@/lib/types";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from "lucide-react";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-serif font-bold tracking-tight hover:text-primary transition-colors"
            >
              <img src="/fav.png" alt="AS Logo" className="h-10 w-auto" />
              <span>Ahmed Shenawy</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              {profile.summary.split(".")[0]}.
            </p>
            <div className="flex space-x-4 mt-6">
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}{" "}
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
              >
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors link-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="text-muted-foreground hover:text-primary transition-colors link-underline"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="text-muted-foreground hover:text-primary transition-colors link-underline"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-primary transition-colors link-underline"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors link-underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  {profile.location}
                </span>
              </li>
              <li className="flex items-start">
                <ExternalLinkIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Ahmed Shenawy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
