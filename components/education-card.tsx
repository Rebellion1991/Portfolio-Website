"use client";

import { motion } from "framer-motion";
import type { Education } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, GraduationCap, Award } from "lucide-react";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  const dateRange = formatDateRange(education.startDate, education.endDate);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="md:flex">
        <div className="md:w-1/3 bg-primary/5 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {education.degree}
            </h3>
            <p className="text-muted-foreground">{education.field}</p>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground relative z-10">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
            <span>{dateRange}</span>
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-semibold">{education.institution}</h3>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <p>{education.location}</p>
            </div>
          </div>

          {education.description && (
            <p className="mb-4 text-muted-foreground">
              {education.description}
            </p>
          )}

          {education.achievements && education.achievements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Award className="h-4 w-4 mr-2 text-primary" />
                Achievements
              </h4>{" "}
              <ul className="space-y-2">
                {education.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start text-muted-foreground"
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"
                      aria-hidden="true"
                    ></span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
