"use client"

import { motion } from "framer-motion"
import type { Education } from "@/lib/types"
import { formatDateRange } from "@/lib/utils"
import { GraduationCap, Award, MapPin } from "lucide-react"

interface EducationTimelineProps {
  education: Education[]
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="relative pl-8 border-l-2 border-primary/20 space-y-12 py-4">
      {education.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Timeline dot */}
          <div className="absolute w-5 h-5 rounded-full bg-primary left-0 top-0 transform -translate-x-[18px] shadow-glow-sm"></div>

          {/* Date */}
          <div className="text-sm text-muted-foreground mb-3 flex items-center">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              {formatDateRange(entry.startDate, entry.endDate)}
            </span>
          </div>

          {/* Content */}
          <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 mr-3 text-primary" />
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{entry.degree}</h3>
                <p className="text-lg">{entry.field}</p>
              </div>
            </div>

            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              <p>
                {entry.institution}, {entry.location}
              </p>
            </div>

            {entry.description && <p className="mb-4 text-muted-foreground">{entry.description}</p>}

            {entry.achievements && entry.achievements.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {entry.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
