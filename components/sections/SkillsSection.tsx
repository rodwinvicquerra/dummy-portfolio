"use client"

import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Laravel", "PHP", "Express.js", "RESTful APIs", "Authentication", "Server Management"]
  },
  {
    category: "Database & ORM",
    skills: ["MySQL", "PostgreSQL", "Prisma", "SQL", "Database Design", "Data Modeling"]
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "Vercel", "Docker", "npm/pnpm", "VS Code", "Postman", "CI/CD"]
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive skill set across the full development stack
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Card key={idx} className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx}
                    className="px-3 py-1.5 bg-muted text-sm font-medium text-foreground rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 bg-muted/50 border-l-4 border-l-accent">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Additional Capabilities</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-primary mb-2">Soft Skills</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li> Problem Solving</li>
                <li> Team Collaboration</li>
                <li> Communication</li>
                <li> Time Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Development Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li> Clean Code</li>
                <li> Code Review</li>
                <li> Agile Methodology</li>
                <li> Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Currently Learning</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li> GraphQL</li>
                <li> Microservices</li>
                <li> Cloud Services (AWS)</li>
                <li> Testing (Jest/Vitest)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}