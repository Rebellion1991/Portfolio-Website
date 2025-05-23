"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getEducation } from "@/lib/content";
import type { Education } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationCard } from "@/components/education-card";
import { EducationTimeline } from "@/components/education-timeline";
import {
  GraduationCap,
  BookOpen,
  Award,
  Brain,
  School,
  Calendar,
  Trophy,
} from "lucide-react";

export default function EducationPageClient() {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cards");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const educationData = await getEducation();
        setEducation(educationData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching education:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Example skills gained from education
  const educationalSkills = [
    { name: "Telecommunications Engineering", level: 95 },
    { name: "Network Architecture", level: 90 },
    { name: "Signal Processing", level: 85 },
    { name: "Wireless Communications", level: 92 },
    { name: "Digital Electronics", level: 88 },
    { name: "Research Methodology", level: 80 },
  ];

  if (isLoading) {
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

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="font-heading mb-6">Education & Qualifications</h1>
              <p className="text-xl text-white/80">
                My academic journey and qualifications in telecommunications and
                electrical engineering.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Education Overview */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: School, label: "Institutions", value: education.length },
              { icon: Calendar, label: "Years of Study", value: "6+" },
              {
                icon: Trophy,
                label: "Achievements",
                value: education.reduce(
                  (acc, edu) => acc + (edu.achievements?.length || 0),
                  0
                ),
              },
              {
                icon: Brain,
                label: "Core Skills",
                value: educationalSkills.length,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border text-center hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-1">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs
              defaultValue="cards"
              className="mb-12"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="cards" className="text-sm">
                    <div className="flex items-center">
                      <School className="h-4 w-4 mr-2" />
                      Card View
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Timeline View
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="cards" className="mt-6">
                <div className="space-y-8 max-w-4xl mx-auto">
                  {education.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EducationCard education={entry} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <EducationTimeline education={education} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Education Details */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-8 border shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">
                Educational Philosophy
              </h2>
              <p className="text-muted-foreground mb-6">
                My educational journey has been focused on building a strong
                foundation in telecommunications engineering while continuously
                expanding my knowledge through specialized courses and
                certifications. I believe in the power of lifelong learning and
                staying current with industry advancements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Academic Focus
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Telecommunications Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Mobile Network Architecture</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Signal Processing & Optimization</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Academic Achievements
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Graduated with honors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Published research in telecommunications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Dean's list for academic excellence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Skills Gained Through Education
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic background has equipped me with a diverse set of
              technical and analytical skills that I apply in my professional
              work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {educationalSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-primary/80"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuing Education */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Continuing Education
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                I believe in lifelong learning and regularly update my skills
                through professional courses and certifications.
              </p>

              <div className="inline-flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Advanced Mobile Core Network Technologies
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Roaming Services Management
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Telecommunications Standards
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Network Performance Analysis
                </span>
              </div>

              <a
                href="/courses"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                View all courses and certifications
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
