"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-accent rounded-full mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities. 
            Let's discuss how we can work together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:rodwin@example.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  rodwin@example.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href="tel:+639165829185" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  +63 916 582 9185
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Roxas, Isabela, Philippines
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Github className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">GitHub</h3>
                <a 
                  href="https://github.com/rodwinvicquerra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  github.com/rodwinvicquerra
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-muted/50 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Ready to Start a Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you have a project in mind or just want to connect, feel free to reach out. 
            I'm always interested in hearing about new opportunities and collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="mailto:rodwin@example.com">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 mr-2" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}