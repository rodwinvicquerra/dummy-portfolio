import type { NextRequest } from "next/server"

type RateRecord = { count: number; resetAt: number }
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5
const ipStore = new Map<string, RateRecord>()

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") || ""
  const ip = fwd.split(",")[0]?.trim()
  return ip || "unknown"
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json()

    // Honeypot
    if (typeof website === "string" && website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 })
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email." }), { status: 400 })
    }

    // Rate limit by IP
    const ip = getClientIp(req)
    const now = Date.now()
    const record = ipStore.get(ip)
    if (!record || now > record.resetAt) {
      ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    } else {
      if (record.count >= MAX_REQUESTS) {
        return new Response(JSON.stringify({ message: "Too many requests. Please try later." }), { status: 429 })
      }
      record.count += 1
      ipStore.set(ip, record)
    }

    // In a real system, send email or store in DB here.
    console.log("Contact submission:", { name, email, message, ip })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unexpected error." }), { status: 500 })
  }
}


