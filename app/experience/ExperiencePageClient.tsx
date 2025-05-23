"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getExperiences } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, CalendarIcon, MapPinIcon, SearchIcon, FilterIcon, CheckIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ExperiencePageClient() {
  const [experiences, setExperiences] = useState([])
  const [filteredExperiences, setFilteredExperiences] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    technologies: [],
    companies: [],
  })
  const [activeFilters, setActiveFilters] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experiencesData = await getExperiences()
        setExperiences(experiencesData)
        setFilteredExperiences(experiencesData)

        // Extract unique technologies and companies for filters
        const techs = new Set()
        const companies = new Set()

        experiencesData.forEach((exp) => {
          exp.technologies.forEach((tech) => techs.add(tech))
          companies.add(exp.company)
        })

        setFilters({
          technologies: Array.from(techs),
          companies: Array.from(companies),
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching experiences:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter experiences based on search term and active filters
    let filtered = [...experiences]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(term) ||
          exp.company.toLowerCase().includes(term) ||
          exp.description.toLowerCase().includes(term) ||
          exp.responsibilities.some((r) => r.toLowerCase().includes(term)) ||
          exp.technologies.some((t) => t.toLowerCase().includes(term)),
      )
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((exp) =>
        activeFilters.some((filter) => exp.technologies.includes(filter) || exp.company === filter),
      )
    }

    setFilteredExperiences(filtered)
  }, [searchTerm, activeFilters, experiences])

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-muted h-16 w-16 mb-4"></div>
          <div className="h-4 bg-muted rounded w-48 mb-2"></div>
          <div className="h-3 bg-muted rounded w-32"></div>
        </div>
      </div>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="mb-6">Professional Experience</h1>
              <p className="text-xl text-white/80">
                My professional journey in telecommunications, focusing on mobile core network optimization and roaming
                services enhancement.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-md group">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="Search experiences..."
                className="pl-10 h-12 rounded-full transition-all duration-300 border-muted-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="bg-muted rounded-full px-4 py-2 text-sm font-medium flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                <span>Filters:</span>
              </div>

              {filters.technologies.slice(0, 3).map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => toggleFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 flex items-center ${
                    activeFilters.includes(tech)
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted hover:bg-muted-foreground/10"
                  }`}
                >
                  {activeFilters.includes(tech) ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-1">
                      <CheckIcon className="h-3 w-3" />
                    </motion.span>
                  ) : null}
                  {tech}
                </motion.button>
              ))}

              {filters.companies.map((company) => (
                <motion.button
                  key={company}
                  onClick={() => toggleFilter(company)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 flex items-center ${
                    activeFilters.includes(company)
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted hover:bg-muted-foreground/10"
                  }`}
                >
                  {activeFilters.includes(company) ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-1">
                      <CheckIcon className="h-3 w-3" />
                    </motion.span>
                  ) : null}
                  {company}
                </motion.button>
              ))}

              {activeFilters.length > 0 && (
                <motion.button
                  onClick={() => setActiveFilters([])}
                  className="text-sm text-primary hover:text-primary/80 hover:underline flex items-center transition-colors duration-300"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear all
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="py-20">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredExperiences.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setActiveFilters([])
                  }}
                  variant="outline"
                  className="rounded-full transition-all duration-300 hover:bg-muted/80 hover:scale-105"
                >
                  Reset filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl mx-auto"
              >
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 h-full w-px bg-primary/20 transform md:-translate-x-px z-0"></div>

                <div className="space-y-20">
                  {filteredExperiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative z-10"
                    >
                      <div
                        className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                      >
                        {/* Timeline dot and date */}
                        <div className="hidden md:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
                          <motion.div
                            className="w-5 h-5 rounded-full bg-primary shadow-glow-sm"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          ></motion.div>
                          <motion.div
                            className={`mt-4 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full ${index % 2 === 0 ? "md:-translate-x-full md:-ml-4" : "md:translate-x-0 md:ml-4"}`}
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {formatDateRange(experience.startDate, experience.endDate)}
                          </motion.div>
                        </div>

                        {/* Mobile date - visible only on mobile */}
                        <div className="md:hidden mb-4 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">
                            {formatDateRange(experience.startDate, experience.endDate)}
                          </span>
                        </div>

                        {/* Content column */}
                        <div className={`w-full md:w-[calc(50%-40px)]`}>
                          <motion.div
                            className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2"
                            whileHover={{
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                          >
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold mb-2">{experience.title}</h2>
                              <div className={`flex items-center text-muted-foreground mb-4 gap-2 flex-wrap`}>
                                <div className="flex items-center">
                                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                                  <span>{experience.company}</span>
                                </div>
                                <span className="hidden md:inline">•</span>
                                <div className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-1" />
                                  <span>{experience.location}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground">{experience.description}</p>
                            </div>

                            <div className="space-y-6">
                              {experience.responsibilities.length > 0 && (
                                <div>
                                  <h3 className={`text-lg font-semibold mb-3`}>Key Responsibilities</h3>
                                  <ul className={`space-y-2 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                                    {experience.responsibilities.map((responsibility, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                                        whileHover={{ x: index % 2 === 0 ? -3 : 3 }}
                                        className="flex items-start"
                                      >
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 mr-2"></span>
                                        <span>{responsibility}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {experience.achievements.length > 0 && (
                                <div>
                                  <h3 className={`text-lg font-semibold mb-3`}>Achievements</h3>
                                  <ul className={`space-y-2 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                                    {experience.achievements.map((achievement, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                                        whileHover={{ x: index % 2 === 0 ? -3 : 3 }}
                                        className="flex items-start"
                                      >
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 mr-2"></span>
                                        <span>{achievement}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {experience.technologies.length > 0 && (
                                <div>
                                  <h3 className={`text-lg font-semibold mb-3`}>Technologies</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((technology, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                      >
                                        <Badge
                                          variant="secondary"
                                          className="px-3 py-1 text-xs font-medium transition-colors duration-300 hover:bg-secondary/80"
                                        >
                                          {technology}
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        {/* Empty column for layout */}
                        <div className="hidden md:block w-[calc(50%-40px)]"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new projects, opportunities, and partnerships.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button asChild size="lg" className="rounded-full">
                  <a href="/contact">Get in Touch</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

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
