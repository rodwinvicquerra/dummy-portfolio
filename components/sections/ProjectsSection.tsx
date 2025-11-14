"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, Folder, TrendingUp, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    title: "Professional Portfolio with RBAC",
    description:
      "Complete professional portfolio featuring enterprise-grade security with Role-Based Access Control (RBAC) using Clerk. Includes admin-only security dashboard, MCP integration showcase, OAuth-protected API endpoints, and comprehensive security documentation. Built with Next.js 14, TypeScript, and deployed on Vercel with 95/100 security score.",
    technologies: ["Next.js 14", "TypeScript", "Clerk RBAC", "OAuth 2.0", "Security Headers", "Vercel"],
    github: "https://github.com/rodwinvicquerra/weekDeliverable-9-eca-rodwinV-",
    demo: "https://week-deliverable-9-eca-rodwin-v.vercel.app/",
    featured: true,
    color: "from-primary to-accent",
    caseStudy: {
      problem: "Required professional portfolio with enterprise security and role-based access control",
      solution: "Implemented Clerk RBAC with admin-only pages, OAuth MCP API, CSP headers, and security monitoring",
      metrics: { security: "95/100", features: 12, rbac: "Admin/Viewer" },
      lmsLink: "#"
    }
  },
  {
    title: "OAuth MCP Authentication Demo",
    description:
      "Customized Model Context Protocol authentication demo with end-to-end OAuth flow. Features deployment URL with working authentication, client setup playbook, and comprehensive security documentation on token storage, scopes, and revocation.",
    technologies: ["OAuth", "MCP", "Claude Desktop", "VS Code", "Security"],
    github: "https://github.com/rodwinvicquerra/week8-echa-full-security-rodwinviquerra",
    demo: "https://week8-echa-full-security-rodwinviquerra.vercel.app/",
    featured: true,
    color: "from-primary to-accent",
    caseStudy: {
      problem: "AI tools needed secure server-to-server authentication with OAuth protection",
      solution: "Implemented MCP server with Clerk OAuth, security headers, and incident response",
      metrics: { security: "95/100", uptime: "99.9%", routes: 8 },
      lmsLink: "#"
    }
  },
  {
    title: "Clerk Authentication App",
    description:
      "A modern web application featuring secure user authentication with Clerk. Deployed on Vercel with clean architecture and responsive design for seamless user experience.",
    technologies: ["React", "Node.js", "Clerk Auth", "Vercel"],
    github: "#",
    demo: "https://clerk-rodwin-nov10updated.vercel.app/",
    featured: true,
    color: "from-accent to-primary",
    caseStudy: {
      problem: "Required enterprise-grade authentication for modern web apps",
      solution: "Integrated Clerk OAuth with GitHub provider and session management",
      metrics: { users: "50+", security: "OAuth 2.0", sessions: "100%" },
      lmsLink: "#"
    }
  },
  {
    title: "Barangay Portal System",
    description:
      "Full-featured barangay management system built with traditional web technologies. Implements WAMP stack for robust data management and community services.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "WAMP"],
    github: "#",
    demo: "http://codebyceto.site/brgyportal_2/",
    featured: true,
    color: "from-accent to-primary",
    caseStudy: {
      problem: "Local government needed digital transformation for citizen services",
      solution: "Built full-stack portal with PHP/MySQL for records and document management",
      metrics: { modules: 5, records: "1000+", response: "<2s" },
      lmsLink: "#"
    }
  },
  {
    title: "Digital Portfolio v1",
    description:
      "My first portfolio draft website showcasing web development skills. A foundation project that demonstrates clean design principles and modern web practices.",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/rodwinvicquerra/v0-digital-portfolio-website-mm",
    demo: "#",
    featured: false,
    color: "from-primary/80 to-accent/80",
    caseStudy: {
      problem: "Needed professional online presence to showcase skills",
      solution: "Created responsive portfolio with Next.js and modern design system",
      metrics: { components: 10, pages: 5, responsive: "100%" },
      lmsLink: "#"
    }
  },
  {
    title: "Digital Portfolio v2",
    description:
      "Advanced portfolio version featuring Prisma database integration for authentication, React frontend, and deployed on Vercel. Demonstrates full-stack capabilities and modern deployment practices.",
    technologies: ["React", "Prisma", "PostgreSQL", "Vercel"],
    github: "#",
    demo: "https://v0-digital-portfolio-website-nu.vercel.app/",
    featured: true,
    color: "from-accent/80 to-primary/80",
    caseStudy: {
      problem: "Required database-backed authentication and dynamic content",
      solution: "Implemented Prisma ORM with PostgreSQL and full-stack architecture",
      metrics: { auth: "Prisma", database: "PostgreSQL", deployment: "Vercel" },
      lmsLink: "#"
    }
  },
]

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 2
  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const visibleProjects = projects.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
            <Folder className="h-4 w-4" />
            My Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and contributions
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:border-primary hover:bg-primary/5 hover:scale-110'
            }`}
            aria-label="Previous projects"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= totalPages - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentIndex >= totalPages - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:border-primary hover:bg-primary/5 hover:scale-110'
            }`}
            aria-label="Next projects"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Projects Grid with Animation */}
          <div className="overflow-hidden">
            <div 
              className="grid gap-8 md:grid-cols-2 transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(0)`,
                opacity: 1
              }}
            >
              {visibleProjects.map((project, idx) => (
                <Card
                  key={currentIndex * itemsPerPage + idx}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`}>
                        <Folder className="h-6 w-6 text-primary" />
                      </div>
                      {project.featured && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                          <Star className="h-3 w-3 text-primary fill-primary" />
                          <span className="text-xs font-semibold text-primary">Featured</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Title & Description */}
                    <div className="flex-1 mb-4">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Case Study Metrics */}
                    {project.caseStudy && (
                      <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary">CASE STUDY</span>
                        </div>
                        <div className="text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Problem:</span>
                            <span className="font-medium text-right flex-1 ml-2">{project.caseStudy.problem}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Solution:</span>
                            <span className="font-medium text-right flex-1 ml-2">{project.caseStudy.solution}</span>
                          </div>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {Object.entries(project.caseStudy.metrics).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2 group-hover:border-primary group-hover:text-primary transition-all" 
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90 shadow-sm hover:shadow-lg transition-all" 
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                      {project.caseStudy?.lmsLink && project.caseStudy.lmsLink !== "#" && (
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="gap-2" 
                          asChild
                        >
                          <a href={project.caseStudy.lmsLink} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="h-4 w-4" />
                            LMS
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Want to see more of my work?</p>
          <Button variant="outline" size="lg" className="gap-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all" asChild>
            <a href="https://github.com/rodwinvicquerra" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
