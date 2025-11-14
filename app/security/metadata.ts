import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Portfolio - Rodwin Vicquerra",
  description: "Comprehensive security implementation showcasing OAuth authentication, MCP integration, threat protection, and incident response capabilities. Week 8 & 9 deliverable featuring active security features, HTTPS enforcement, and professional security architecture.",
  keywords: [
    "OAuth",
    "MCP",
    "Security",
    "Authentication",
    "Clerk",
    "Next.js",
    "Vercel",
    "Web Security",
    "Security Headers",
    "HTTPS",
    "CSRF Protection",
    "Incident Response",
    "Threat Protection"
  ],
  authors: [{ name: "Rodwin Vicquerra" }],
  openGraph: {
    title: "Security Portfolio - Rodwin Vicquerra",
    description: "Professional security implementation with OAuth authentication, MCP integration, and comprehensive threat protection",
    type: "website",
    url: "https://week8-echa-full-security-rodwinviquerra.vercel.app/security",
    siteName: "Rodwin Vicquerra Portfolio",
    images: [
      {
        url: "/images/security-og.png",
        width: 1200,
        height: 630,
        alt: "Security Portfolio Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Portfolio - Rodwin Vicquerra",
    description: "Professional security implementation with OAuth authentication and MCP integration",
    images: ["/images/security-og.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://week8-echa-full-security-rodwinviquerra.vercel.app/security"
  }
}
