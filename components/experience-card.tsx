import type { Experience } from "@/lib/types"
import { formatDateRange } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceCardProps {
  experience: Experience
  isEven: boolean
}

export function ExperienceCard({ experience, isEven }: ExperienceCardProps) {
  const dateRange = formatDateRange(experience.startDate, experience.endDate)

  return (
    <div className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}>
      {/* Timeline dot */}
      <div className="hidden md:block w-4 h-4 rounded-full bg-primary absolute left-1/2 top-6 transform -translate-x-1/2"></div>

      {/* Date column - visible only on mobile */}
      <div className="md:hidden mb-2">
        <Badge variant="outline" className="text-sm font-medium">
          {dateRange}
        </Badge>
      </div>

      {/* Content column */}
      <div className={`w-full md:w-1/2 ${isEven ? "md:text-right" : ""}`}>
        <Card>
          <CardHeader className="pb-2">
            <div className="hidden md:block mb-2">
              <Badge variant="outline" className="text-sm font-medium">
                {dateRange}
              </Badge>
            </div>
            <CardTitle className="text-xl">{experience.title}</CardTitle>
            <CardDescription className="text-base">
              {experience.company} • {experience.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{experience.description}</p>

            <div className="space-y-4">
              {experience.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                  <ul className={`list-disc ${isEven ? "md:ml-auto md:mr-5" : "ml-5"} space-y-1`}>
                    {experience.responsibilities.map((responsibility, index) => (
                      <li key={index} className={isEven ? "md:text-right" : ""}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Achievements</h4>
                  <ul className={`list-disc ${isEven ? "md:ml-auto md:mr-5" : "ml-5"} space-y-1`}>
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className={isEven ? "md:text-right" : ""}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
                    {experience.technologies.map((technology, index) => (
                      <Badge key={index} variant="secondary">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty column for layout */}
      <div className="hidden md:block w-1/2"></div>
    </div>
  )
}
