"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getCourses } from "@/lib/content"
import { BookOpenIcon, AwardIcon, CalendarIcon, BarChart3Icon, SearchIcon, FilterIcon, CheckIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/course-card"

export default function CoursesPageClient() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState("grid") // grid or list

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getCourses()
        setCourses(coursesData)
        setFilteredCourses(coursesData)

        // Extract unique categories and providers
        const uniqueCategories = Array.from(new Set(coursesData.map((course) => course.category)))
        const uniqueProviders = Array.from(new Set(coursesData.map((course) => course.provider)))

        setCategories(uniqueCategories)
        setProviders(uniqueProviders)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter courses based on search term and active filters
    let filtered = [...courses]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.provider.toLowerCase().includes(term) ||
          course.description?.toLowerCase().includes(term) ||
          course.skills.some((skill) => skill.toLowerCase().includes(term)) ||
          course.category.toLowerCase().includes(term),
      )
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter(
        (course) => activeFilters.includes(course.category) || activeFilters.includes(course.provider),
      )
    }

    setFilteredCourses(filtered)
  }, [searchTerm, activeFilters, courses])

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  // Calculate statistics
  const totalCourses = courses.length
  const totalProviders = providers.length
  const totalCategories = categories.length
  const latestCourse = courses[0] // Courses are already sorted by date

  // Group courses by provider for display
  const coursesByProvider = {}
  filteredCourses.forEach((course) => {
    if (!coursesByProvider[course.provider]) {
      coursesByProvider[course.provider] = []
    }
    coursesByProvider[course.provider].push(course)
  })

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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <BookOpenIcon className="h-8 w-8" />
              </div>
              <h1 className="mb-6">Courses & Certifications</h1>
              <p className="text-xl text-white/80">
                My professional development journey through courses and certifications in telecommunications,
                networking, and related fields.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-6 border flex items-start space-x-4 hover:shadow-md transition-all duration-300"
            >
              <BookOpenIcon className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <h3 className="text-3xl font-bold">{totalCourses}</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl p-6 border flex items-start space-x-4 hover:shadow-md transition-all duration-300"
            >
              <AwardIcon className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Course Providers</p>
                <h3 className="text-3xl font-bold">{totalProviders}</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl p-6 border flex items-start space-x-4 hover:shadow-md transition-all duration-300"
            >
              <BarChart3Icon className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Skill Categories</p>
                <h3 className="text-3xl font-bold">{totalCategories}</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl p-6 border flex items-start space-x-4 hover:shadow-md transition-all duration-300"
            >
              <CalendarIcon className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Latest Certification</p>
                <h3 className="text-xl font-bold truncate">{latestCourse?.title}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10 h-12 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="bg-muted rounded-full px-4 py-2 text-sm font-medium flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                <span>Filters:</span>
              </div>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors flex items-center ${
                    activeFilters.includes(category) ? "bg-primary text-white" : "bg-muted hover:bg-muted-foreground/10"
                  }`}
                >
                  {activeFilters.includes(category) && <CheckIcon className="h-3 w-3 mr-1" />}
                  {category}
                </button>
              ))}

              {providers.slice(0, 2).map((provider) => (
                <button
                  key={provider}
                  onClick={() => toggleFilter(provider)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors flex items-center ${
                    activeFilters.includes(provider) ? "bg-primary text-white" : "bg-muted hover:bg-muted-foreground/10"
                  }`}
                >
                  {activeFilters.includes(provider) && <CheckIcon className="h-3 w-3 mr-1" />}
                  {provider}
                </button>
              ))}

              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveView("grid")}
                className={`p-2 rounded-md ${activeView === "grid" ? "bg-primary text-white" : "bg-muted"}`}
                aria-label="Grid view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`p-2 rounded-md ${activeView === "list" ? "bg-primary text-white" : "bg-muted"}`}
                aria-label="List view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm bg-muted rounded-md px-2 py-1 border-0">
                <option>Most Recent</option>
                <option>Oldest First</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-10">
        <div className="container">
          {Object.keys(coursesByProvider).length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <SearchIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilters([])
                }}
                variant="outline"
                className="rounded-full"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(coursesByProvider).map(([provider, providerCourses]) => (
                <motion.div
                  key={provider}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b flex items-center">
                    <AwardIcon className="h-6 w-6 mr-2 text-primary" />
                    {provider}
                  </h2>

                  {activeView === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {providerCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CourseCard course={course} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {providerCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-card rounded-xl p-6 border hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-2/3">
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                              <div className="flex items-center text-muted-foreground mb-4">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>
                                  Completed{" "}
                                  {new Date(course.completionDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                  })}
                                </span>
                              </div>
                              {course.description && <p className="text-muted-foreground mb-4">{course.description}</p>}
                            </div>
                            <div className="md:w-1/3">
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-2">Skills Gained:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {course.skills.map((skill, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {course.certificateUrl && (
                                <a
                                  href={course.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-primary hover:underline"
                                >
                                  <AwardIcon className="mr-2 h-4 w-4" />
                                  View Certificate
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">My Learning Philosophy</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I believe in continuous learning and staying updated with the latest advancements in telecommunications
                and network technologies. My approach to professional development combines formal education with
                hands-on experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Continuous Learning",
                  description:
                    "I regularly update my skills through courses, certifications, and industry conferences.",
                  icon: BookOpenIcon,
                },
                {
                  title: "Practical Application",
                  description: "I apply theoretical knowledge to real-world scenarios to solidify understanding.",
                  icon: BarChart3Icon,
                },
                {
                  title: "Knowledge Sharing",
                  description: "I believe in sharing knowledge with colleagues and contributing to the community.",
                  icon: AwardIcon,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border text-center hover:shadow-md transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
