"use client"

import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/common"

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace("/portfolio")
  }, [isLoaded, isSignedIn, router])

  const isDark = mounted && resolvedTheme === "dark"

  // Prevent hydration mismatch by not rendering until client-side mounted
  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground">
            Create Account
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Sign up to access my portfolio and explore my work.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="mb-4 text-center text-sm text-muted-foreground">
            <span>Already have an account? </span>
            <Link href="/sign-in" className="text-primary hover:text-primary/80 underline font-semibold">
              Sign in
            </Link>
          </div>

          <div className="rounded-xl border bg-card shadow-lg p-6 md:p-8">
            <SignUp
              afterSignInUrl="/portfolio"
              afterSignUpUrl="/portfolio"
              path="/sign-up"
              signInUrl="/sign-in"
              appearance={{
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "iconButton",
                  logoPlacement: "none",
                },
                variables: {
                  colorPrimary: isDark ? "#60a5fa" : "#2563eb",
                  colorText: isDark ? "#f1f5f9" : "#0f172a",
                  colorBackground: isDark ? "#1e293b" : "#ffffff",
                  colorInputBackground: isDark ? "#334155" : "#f8fafc",
                  colorInputText: isDark ? "#f1f5f9" : "#0f172a",
                  borderRadius: "0.5rem",
                },
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "border-0 bg-transparent shadow-none",
                  header: "hidden",
                  formButtonPrimary: 
                    "bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-11 font-medium transition-colors",
                  formFieldInput: 
                    "rounded-lg border-input bg-background text-foreground h-11",
                  footerAction: "hidden",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  socialButtonsBlockButton: 
                    "border-input hover:bg-accent hover:text-accent-foreground",
                  formFieldLabel: "text-foreground font-medium",
                },
              }}
            />
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By signing up, you agree to view my portfolio content.</p>
          </div>
        </div>
      </div>
    </div>
  )
}