"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ChevronRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent/10 text-sm font-medium text-accent">
                Available for Work
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                Rodwin Vicquerra
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground/80">
                Aspiring Full Stack Developer | Security-Focused
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                3rd Year IT Student at St. Paul University Philippines. Specialized in building modern web applications with React, Node.js, and Laravel.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToContact} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Contact Me
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open('/resume.pdf', '_blank')} className="border-border hover:bg-muted">
                Download CV
              </Button>
            </div>
            <div className="flex gap-4 pt-4 border-t border-border">
              <a href="https://github.com/rodwinvicquerra" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/rodwin-vicquerra-957630387/" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:rodwinvicquerra@spup.edu.ph" className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[500px] w-80 lg:h-[600px] lg:w-96">
              <div className="absolute inset-0 rounded-lg overflow-hidden bg-card border border-border shadow-xl">
                <Image src="/images/profile.jpg" alt="Rodwin Vicquerra" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}