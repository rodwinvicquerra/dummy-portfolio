import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ChatButton } from "@/components/chat/ChatButton"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Rodwin's Portfolio",
  description: "Portfolio of Rodwin Vicquerra - 3rd Year IT Student majoring in Web Development",
  generator: "v0.app",
  icons: {
    icon: "/iconwebsite.png",
    shortcut: "/iconwebsite.png",
    apple: "/iconwebsite.png",
  },
}

// Force dynamic rendering for Clerk
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get Clerk publishable key from environment
  // NEXT_PUBLIC_ prefix makes it available on client side
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {publishableKey ? (
          <ClerkProvider publishableKey={publishableKey}>
            <Suspense fallback={null}>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
              </ThemeProvider>
            </Suspense>
            <Toaster />
            <ChatButton />
            <Analytics />
          </ClerkProvider>
        ) : (
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center text-white p-8">
                  <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
                  <p className="mb-4">Clerk environment variables are not configured.</p>
                  <p className="text-sm text-gray-400">
                    Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your Vercel environment variables.
                  </p>
                </div>
              </div>
            </ThemeProvider>
          </Suspense>
        )}
      </body>
    </html>
  )
}
