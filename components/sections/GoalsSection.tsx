"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Zap } from "lucide-react"

const shortTermGoals = [
  {
    title: "Master Modern Web Development",
    timeline: "0-3 Months",
    description: "Deepen expertise in Next.js 14, TypeScript, and advanced React patterns. Build production-ready applications with server components and modern deployment strategies.",
    skills: ["Next.js 14", "TypeScript", "Server Components", "API Routes"],
  },
  {
    title: "Security-First Development",
    timeline: "3-6 Months",
    description: "Implement enterprise-grade security in all projects. Master OAuth 2.0, JWT authentication, RBAC, CSP headers, and security best practices following OWASP guidelines.",
    skills: ["OAuth 2.0", "RBAC", "Security Headers", "OWASP Top 10"],
  },
  {
    title: "Cloud & DevOps Fundamentals",
    timeline: "4-6 Months",
    description: "Learn cloud deployment with Vercel, AWS, or Azure. Implement CI/CD pipelines, monitoring, and automated testing workflows.",
    skills: ["Vercel", "CI/CD", "Docker", "Monitoring"],
  },
]

const midTermGoals = [
  {
    title: "Full-Stack Mastery",
    timeline: "6-9 Months",
    description: "Build complete production applications with advanced backend systems. Master database design, API architecture, real-time features, and scalable infrastructure.",
    skills: ["PostgreSQL", "Prisma ORM", "REST APIs", "WebSockets"],
  },
  {
    title: "Professional Portfolio & Open Source",
    timeline: "9-12 Months",
    description: "Create 3-5 production-grade portfolio projects showcasing real-world problem-solving. Contribute to open-source projects and build a strong GitHub presence.",
    skills: ["Project Management", "Open Source", "Code Review", "Documentation"],
  },
  {
    title: "Junior Developer Position",
    timeline: "10-12 Months",
    description: "Secure first professional role as a Junior Full-Stack Developer. Focus on companies with mentorship programs and collaborative team environments.",
    skills: ["Job Search", "Technical Interviews", "Team Collaboration", "Agile"],
  },
]

export function GoalsSection() {
  return (
    <section id="goals" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Career Roadmap</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategic plan to transition from student to professional full-stack developer with focus on modern technologies and security best practices.
          </p>
        </div>

        {/* 6-Month Short-Term Goals */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">6-Month Career Roadmap</h3>
              <p className="text-sm text-muted-foreground">Short-Term Goals • Building Foundation</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {shortTermGoals.map((goal, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {goal.timeline}
                  </Badge>
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{goal.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{goal.description}</p>
                <div className="flex flex-wrap gap-2">
                  {goal.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 12-Month Mid-Term Goals */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">12-Month Career Roadmap</h3>
              <p className="text-sm text-muted-foreground">Mid-Term Goals • Professional Growth</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {midTermGoals.map((goal, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] border-accent/20">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                    {goal.timeline}
                  </Badge>
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{goal.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{goal.description}</p>
                <div className="flex flex-wrap gap-2">
                  {goal.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Note */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-semibold text-foreground">Commitment:</span> Dedicated to continuous learning, building real-world projects, and becoming a valuable team member in a professional development environment.
          </p>
        </div>
      </div>
    </section>
  )
}
