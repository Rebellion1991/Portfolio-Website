"use client"
import Link from "next/link"
import { getProfile, getFeaturedProjects, getExperiences } from "@/lib/content"
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion" // Import motion from framer-motion
import { useEffect, useState } from "react"

// Helper function to format date range
function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  if (!endDate) {
    return `${startFormatted} - Present`
  }

  const end = new Date(endDate)
  const endFormatted = end.toLocaleDateString("en-US", { month: "short", year: "numeric" })

  return `${startFormatted} - ${endFormatted}`
}

export default function ClientPage() {
  const [profile, setProfile] = useState(null)
  const [featuredProjects, setFeaturedProjects] = useState(null)
  const [experiences, setExperiences] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile()
      const featuredProjectsData = await getFeaturedProjects()
      const experiencesData = await getExperiences()

      setProfile(profileData)
      setFeaturedProjects(featuredProjectsData)
      setExperiences(experiencesData)
    }

    fetchData()
  }, [])

  if (!profile || !featuredProjects || !experiences) {
    return <div>Loading...</div>
  }

  const latestExperience = experiences[0]

  return (
    <>
      <PersonJsonLd profile={profile} />
      <WebsiteJsonLd profile={profile} />

      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-balance">
                <span className="block text-sm uppercase tracking-widest mb-4 text-white/80">
                  Mobile Network Specialist
                </span>
                Ahmed Shenawy
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed">
                {profile.summary.split(".")[0]}.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/contact">
                    Get in Touch <Mail className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 to-purple-600/30 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl animate-scaleIn">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto font-mono text-xs text-white/70">network-specialist.sh</div>
                </div>
                <div className="font-mono text-sm text-white/90 space-y-2">
                  <div className="flex">
                    <span className="text-brand-400 mr-2">$</span>
                    <span className="typing-animation">whoami</span>
                  </div>
                  <div className="pl-4">Mobile Core Network Specialist</div>
                  <div className="flex">
                    <span className="text-brand-400 mr-2">$</span>
                    <span>skills</span>
                  </div>
                  <div className="pl-4 flex flex-wrap gap-2">
                    {profile.skills.flatMap((category) =>
                      category.items.slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      )),
                    )}
                  </div>
                  <div className="flex">
                    <span className="text-brand-400 mr-2">$</span>
                    <span>current_position</span>
                  </div>
                  <div className="pl-4">
                    {latestExperience.title} @ {latestExperience.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore some of my notable work in mobile network optimization and telecommunications.
              </p>
            </div>
            <Link href="/projects" className="group mt-4 md:mt-0 inline-flex items-center text-primary font-medium">
              View all projects
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-hover bg-card rounded-xl overflow-hidden border">
                  <div className="relative h-56 w-full overflow-hidden">
                    <OptimizedImage
                      src={project.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          View Project <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlight Section */}
      <section className="bg-muted/50 section-padding">
        <div className="container">
          <h2 className="text-center mb-16">Professional Experience</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-primary/20 transform md:-translate-x-px"></div>

            {experiences.slice(0, 2).map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10 mb-12"
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block w-4 h-4 rounded-full bg-primary absolute left-1/2 top-6 transform -translate-x-1/2"></div>

                  {/* Content column */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="bg-card rounded-xl p-6 border shadow-sm card-hover">
                      <div className="mb-4">
                        <Badge variant="outline" className="text-sm font-medium mb-2">
                          {formatDateRange(experience.startDate, experience.endDate)}
                        </Badge>
                        <h3 className="text-xl font-bold">{experience.title}</h3>
                        <p className="text-muted-foreground">
                          {experience.company} • {experience.location}
                        </p>
                      </div>

                      <p className="mb-4">{experience.description}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {experience.technologies.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {experience.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{experience.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Empty column for layout */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/experience">
                View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Let's Work Together</h2>
            <p className="text-xl text-white/80 mb-8">
              Looking for expertise in mobile network optimization or telecommunications? I'm open to discussing how I
              can help with your projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-brand-900 hover:bg-white/90">
                <Link href="/contact">
                  Get in Touch <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
