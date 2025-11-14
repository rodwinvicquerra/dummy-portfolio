"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    title: "Student Developer",
    company: "Currently Building Skills",
    period: "2023 - Present",
    description:
      "Focusing on learning web development technologies and building personal projects. Actively studying modern web frameworks, responsive design principles, and best practices in software development.",
    technologies: ["Web Development", "Problem Solving", "Self-Learning", "Project-Based Learning"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Experience</h2>
        
        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-20">
                <div className="absolute left-0 md:left-6 top-2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm" />
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="text-sm leading-relaxed mb-4 text-foreground/80">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
