/**
 * @fileoverview Client component for the About page
 * Displays personal information, professional background, technical skills,
 * education history, and personal interests in a tabbed interface.
 * @module app/about/AboutClientPage
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "@/lib/content";
import type { Profile } from "@/lib/types";
import { OptimizedImage } from "@/components/optimized-image";
import { Button } from "@/components/ui/button";
import {
  Download,
  Mail,
  MapPin,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * AboutClientPage Component
 * Renders the main content of the About page with tabs for different sections
 * @component
 * @returns {JSX.Element} Rendered component
 */
export default function AboutClientPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("professional");

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-muted h-16 w-16 mb-4"></div>
          <div className="h-4 bg-muted rounded w-48 mb-2"></div>
          <div className="h-3 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "technical", label: "Technical Skills", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "personal", label: "Personal", icon: Award },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <h1 className="font-heading mb-8 text-center md:text-left">
            About Me
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {profile.summary}
              </p>{" "}
              <div className="flex flex-wrap gap-8 mt-8">
                <a
                  href="#connect"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105 group"
                >
                  <span>Contact Me</span>
                  <Mail className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <motion.div
                className="rounded-lg overflow-hidden border border-white/20 shadow-lg w-64 h-64 transition-all duration-300 hover:shadow-xl hover:border-white/40"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <OptimizedImage
                  src="/images/ahmed.webp"
                  alt={profile.name}
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      {/* Quick Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Years Experience", value: "10+", icon: Briefcase },
              { label: "Projects Completed", value: "20+", icon: Code },
              { label: "Certifications", value: "12", icon: Award },
              { label: "Satisfied Clients", value: "15+", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-card rounded-xl p-6 border text-center transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:bg-primary/20">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Tabbed Content Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
              <div className="flex space-x-2 mx-auto p-1 bg-muted rounded-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {/* Professional Tab */}
                {activeTab === "professional" && (
                  <motion.div
                    key="professional"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="font-heading text-2xl font-bold mb-4">
                        Professional Background
                      </h3>{" "}
                      <p className="text-muted-foreground mb-6">
                        {profile.professionalBackground}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Briefcase className="h-5 w-5 mr-3 text-primary mt-1" />
                          <div>
                            <h4 className="font-heading font-semibold">
                              Current Position
                            </h4>
                            <p className="text-muted-foreground">
                              Roaming Expert at RMI - Rakuten Mobile
                              International
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                          <div>
                            <h4 className="font-heading font-semibold">
                              Location
                            </h4>
                            <p className="text-muted-foreground">
                              {profile.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Award className="h-5 w-5 mr-3 text-primary mt-1" />
                          <div>
                            <h4 className="font-heading font-semibold">
                              Specialization
                            </h4>
                            <p className="text-muted-foreground">
                              Mobile Core Network, Roaming Services, Blockchain
                              Technology
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="font-heading text-2xl font-bold mb-4">
                        Professional Philosophy
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        I believe in delivering excellence in telecommunications
                        by focusing on optimization, reliability, and user
                        experience. My approach combines technical expertise
                        with a deep understanding of business needs.
                      </p>
                      <p className="text-muted-foreground">
                        By staying at the forefront of technological
                        advancements and actively contributing to industry
                        standards, I ensure that the mobile networks I work with
                        provide subscribers with seamless, high-quality
                        services.
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Technical Skills Tab */}
                {activeTab === "technical" && (
                  <motion.div
                    key="technical"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {profile.skills.map((skillCategory, categoryIndex) => (
                      <motion.div
                        key={skillCategory.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: categoryIndex * 0.1,
                        }}
                        className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                        whileHover={{ y: -3 }}
                      >
                        <h3 className="text-2xl font-bold mb-6">
                          {skillCategory.category}
                        </h3>{" "}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {skillCategory.items.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: skillIndex * 0.1,
                              }}
                              className="group bg-muted/50 rounded-lg p-3 hover:bg-muted/70 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span className="font-medium group-hover:text-primary transition-colors">
                                  {skill}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="font-heading text-2xl font-bold mb-6">
                        Educational Background
                      </h3>
                      <div className="space-y-8">
                        <div className="relative pl-8 border-l-2 border-primary/20">
                          <div className="absolute w-4 h-4 rounded-full bg-primary left-0 top-0 transform -translate-x-1/2"></div>
                          <h4 className="font-heading text-xl font-bold">
                            Bachelor of Science in Computer Engineering
                          </h4>
                          <p className="text-muted-foreground mb-2">
                            Arab Academy for Science & Technology AAST,
                            Alexandria Egypt, 2006-2011
                          </p>
                          <p>
                            Developed a comprehensive smart home automation
                            system for the graduation project, featuring IP
                            wireless cameras for security and control.
                          </p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-primary/20">
                          <div className="absolute w-4 h-4 rounded-full bg-primary left-0 top-0 transform -translate-x-1/2"></div>
                          <h4 className="text-xl font-bold">High School</h4>
                          <p className="text-muted-foreground mb-2">
                            El-Nasr Boys School E.B.S, Alexandria Egypt
                          </p>
                          <p>GPA: 93.5% out of 100%</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="font-heading text-2xl font-bold mb-4">
                        Continuing Education
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        I believe in lifelong learning and regularly update my
                        skills through professional courses and certifications.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "MASTERING WEB3 | University of Nicosia",
                          "SS7 & Sigtran technologies",
                          "4G-LTE EPC: Evolved Packet Core Network",
                          "VoLTE | Voice Over LTE & IMS Network",
                        ].map((cert) => (
                          <Badge
                            key={cert}
                            className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 transition-colors duration-300"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Personal Tab */}
                {activeTab === "personal" && (
                  <motion.div
                    key="personal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Personal Approach
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Beyond technical expertise, I bring a collaborative
                        mindset and problem-solving approach to every project. I
                        believe in clear communication and building strong
                        professional relationships.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Collaborative",
                            desc: "I thrive in team environments and enjoy bringing diverse perspectives together to solve complex problems.",
                          },
                          {
                            title: "Detail-Oriented",
                            desc: "I pay close attention to details while maintaining focus on the bigger picture and project goals.",
                          },
                          {
                            title: "Innovative",
                            desc: "I'm constantly looking for new approaches and technologies to improve network performance.",
                          },
                          {
                            title: "Adaptable",
                            desc: "I quickly adapt to changing requirements and technologies in the fast-paced telecommunications industry.",
                          },
                        ].map((trait, i) => (
                          <motion.div
                            key={trait.title}
                            className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <h4 className="font-heading font-semibold mb-2">
                              {trait.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {trait.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-card rounded-xl p-8 border shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Interests & Hobbies
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        When I'm not optimizing mobile networks, you might find
                        me engaged in these activities:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Technology Trends",
                          "Reading",
                          "Travel",
                          "Photography",
                        ].map((hobby, index) => (
                          <motion.div
                            key={hobby}
                            className="text-center"
                            whileHover={{ y: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 hover:bg-primary/20">
                              <span className="text-2xl text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <p className="font-medium">{hobby}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Contact Info Section */}
      <section id="connect" className="bg-muted/30 py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interested in discussing mobile network optimization or
                telecommunications projects? Feel free to reach out through any
                of these channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-card rounded-xl p-6 border text-center transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-card rounded-xl p-6 border text-center transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Location</h3>
                <p>{profile.location}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-card rounded-xl p-6 border text-center transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Linkedin className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">LinkedIn</h3>
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-300 hover:scale-105"
              >
                <a href="/contact">
                  Contact Me <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
