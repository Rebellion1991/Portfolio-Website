"use client"

import { useState, useMemo } from "react"
import type { Course } from "@/lib/types"
import { CourseCard } from "./course-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CourseFilterProps {
  courses: Course[]
  categories: string[]
  providers: string[]
}

export function CourseFilter({ courses, categories, providers }: CourseFilterProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [providerFilter, setProviderFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Filter courses based on selected filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Apply category filter
      if (categoryFilter !== "all" && course.category !== categoryFilter) {
        return false
      }

      // Apply provider filter
      if (providerFilter !== "all" && course.provider !== providerFilter) {
        return false
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          course.title.toLowerCase().includes(query) ||
          course.provider.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          course.skills.some((skill) => skill.toLowerCase().includes(query))
        )
      }

      return true
    })
  }, [courses, categoryFilter, providerFilter, searchQuery])

  // Group courses by provider for display
  const coursesByProvider = useMemo(() => {
    const grouped: Record<string, Course[]> = {}

    filteredCourses.forEach((course) => {
      if (!grouped[course.provider]) {
        grouped[course.provider] = []
      }
      grouped[course.provider].push(course)
    })

    return grouped
  }, [filteredCourses])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <Label htmlFor="search" className="mb-2 block">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category-filter" className="mb-2 block">
            Filter by Category
          </Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="provider-filter" className="mb-2 block">
            Filter by Provider
          </Label>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger id="provider-filter">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {Object.keys(coursesByProvider).length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p>Try adjusting your filters to find courses.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(coursesByProvider).map(([provider, providerCourses]) => (
            <div key={provider}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{provider}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providerCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-sm text-muted-foreground">
        Showing {filteredCourses.length} of {courses.length} courses
      </div>
    </div>
  )
}
