"use client"

import { motion } from "framer-motion"
import type { Course } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CheckCircle2Icon, ExternalLinkIcon } from "lucide-react"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  // Format the completion date
  const formattedDate = new Date(course.completionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="flex justify-between items-start relative z-10">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            {course.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {course.description && <p className="text-sm text-muted-foreground mb-4">{course.description}</p>}

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
          <span>Completed {formattedDate}</span>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Skills Gained:</h4>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      {course.certificateUrl && (
        <CardFooter className="pt-0">
          <motion.a
            href={course.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CheckCircle2Icon className="mr-2 h-4 w-4" />
            View Certificate
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </motion.a>
        </CardFooter>
      )}
    </Card>
  )
}
