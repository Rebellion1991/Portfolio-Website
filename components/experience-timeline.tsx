import type { Experience } from "@/lib/types"
import { ExperienceCard } from "./experience-card"

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 h-full w-px bg-border transform md:-translate-x-px z-0"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative z-10">
            <ExperienceCard experience={experience} isEven={index % 2 === 0} />
          </div>
        ))}
      </div>
    </div>
  )
}
