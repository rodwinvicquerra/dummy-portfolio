import { redirect } from "next/navigation"

// Force dynamic rendering for redirect
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  // Send users to the redesigned Clerk Sign In page
  redirect("/sign-in")
}
