"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">About Me</h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/90 leading-relaxed">
                I am a dedicated Full Stack Developer and 3rd year IT student at St. Paul University Philippines, 
                specializing in modern web technologies and scalable application development.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                With a strong foundation in both frontend and backend development, I create efficient, 
                user-centric solutions using React, Node.js, and Laravel. My approach combines technical 
                expertise with business understanding to deliver applications that meet real-world needs.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Currently expanding my expertise in full-stack development while contributing to various 
                projects including hotel management systems. I am committed to continuous learning and 
                staying current with industry best practices.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Core Competencies</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-primary mb-2">Frontend Development</h4>
                  <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary mb-2">Backend Development</h4>
                  <p className="text-sm text-muted-foreground">Node.js, Laravel, PHP, Express</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary mb-2">Database Management</h4>
                  <p className="text-sm text-muted-foreground">MySQL, PostgreSQL, Prisma ORM</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary mb-2">Tools & Deployment</h4>
                  <p className="text-sm text-muted-foreground">Git, Vercel, Docker, CI/CD</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">3rd Year IT Student</p>
                  <p className="text-sm text-muted-foreground">St. Paul University Philippines</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Roxas, Isabela</p>
                  <p className="text-sm text-muted-foreground">Philippines</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Status</h3>
                  <p className="text-sm text-muted-foreground">Available for Work</p>
                  <p className="text-sm text-muted-foreground">Open to Opportunities</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Code2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Specialization</h3>
                  <p className="text-sm text-muted-foreground">Full Stack Development</p>
                  <p className="text-sm text-muted-foreground">Web Applications</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}