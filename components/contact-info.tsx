"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/types";
import {
  MailIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
  ClockIcon,
} from "lucide-react";

interface ContactInfoProps {
  profile: Profile;
}

export function ContactInfo({ profile }: ContactInfoProps) {
  const contactMethods = [
    {
      icon: MailIcon,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: "Best way to reach me",
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: profile.location,
      description: "Available for remote work",
    },
    {
      icon: ClockIcon,
      label: "Response Time",
      value: "Within 24 hours",
      description: "During business days",
    },
  ];

  const socialLinks = [
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: profile.socialLinks.linkedin,
      color: "hover:text-blue-600",
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      href: profile.socialLinks.github,
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
  ].filter((link) => link.href);

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border shadow-sm"
      >
        <h3 className="text-xl font-heading font-bold mb-6">
          Contact Information
        </h3>
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <method.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  {method.label}
                </h4>
                {method.href ? (
                  <a
                    href={method.href}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="font-semibold">{method.value}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {method.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card rounded-2xl p-6 border shadow-sm"
      >
        <h3 className="text-xl font-heading font-bold mb-6">Connect With Me</h3>
        <div className="space-y-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors ${social.color}`}
            >
              <div className="bg-primary/10 p-2 rounded-full">
                <social.icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl p-6 border"
      >
        <h3 className="text-xl font-heading font-bold mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Available for new projects</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Open to consulting opportunities</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm">Available for speaking engagements</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          I'm currently accepting new projects and collaborations. Let's discuss
          how I can help with your telecommunications needs.
        </p>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card rounded-2xl p-6 border shadow-sm"
      >
        <h3 className="text-xl font-heading font-bold mb-6">
          Frequently Asked
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-heading font-medium mb-2">
              What's your typical response time?
            </h4>
            <p className="text-sm text-muted-foreground">
              I respond to all inquiries within 24 hours during business days.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-medium mb-2">
              Do you work with international clients?
            </h4>
            <p className="text-sm text-muted-foreground">
              Yes, I work with clients globally and am flexible with different
              time zones.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-medium mb-2">
              What types of projects do you take on?
            </h4>
            <p className="text-sm text-muted-foreground">
              I specialize in mobile network optimization, roaming services, and
              telecommunications consulting.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
