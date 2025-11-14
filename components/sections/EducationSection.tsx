"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, Calendar, Award } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    major: "Web Development",
    school: "St. Paul University Philippines",
    location: "Tuguegarao City, Cagayan",
    period: "2022 - Present (3rd Year)",
    status: "Currently Enrolled",
    achievements: [
      "Maintaining strong academic performance",
      "Active participation in programming projects",
      "Focus on modern web development technologies",
      "Collaborative team projects and presentations"
    ]
  }
]

const certifications = [
  "Web Development Fundamentals",
  "React.js Development",
  "Database Management",
  "Full Stack Development"
]

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Education</h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>
        
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <Card key={idx} className="p-8 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                  </div>
                  <p className="text-lg font-medium text-primary">Major in {edu.major}</p>
                  <p className="text-foreground/80 mt-1">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-md bg-accent/10 text-sm font-medium text-accent">
                    {edu.status}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-6">
                <h4 className="font-medium text-sm text-primary">Academic Highlights:</h4>
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, achIdx) => (
                    <li key={achIdx} className="text-sm text-muted-foreground flex items-start">
                      <span className="mr-2"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}

          <Card className="p-8 bg-muted/50 border-l-4 border-l-accent">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-semibold text-foreground">Certifications & Training</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  <span className="text-sm text-foreground/80">{cert}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}