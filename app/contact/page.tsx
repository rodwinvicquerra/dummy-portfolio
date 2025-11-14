"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState<string>("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setError("")

    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""), // honeypot
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setStatus("success")
      e.currentTarget.reset()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data?.message || "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Contact</h1>
        <p className="text-muted-foreground mb-8">Send me a message and I’ll get back to you.</p>

        <Card className="p-6 border-2">
          {status === "success" ? (
            <div className="text-green-600 dark:text-green-400 font-medium">
              Thanks! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" name="message" required placeholder="How can I help?" rows={5} />
              </div>
              {/* Honeypot field (hidden from users) */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {status === "error" && (
                <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
              )}

              <Button type="submit" disabled={status === "sending"} className="font-semibold">
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}


