"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()
  const { user, isLoaded: userLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!authLoaded || !userLoaded) return

    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    // Check if user has admin role
    const role = (user?.publicMetadata?.role as string) || 'viewer'
    
    if (role !== 'admin') {
      // Redirect non-admin users to portfolio
      router.push("/portfolio")
      return
    }

    setIsAdmin(true)
    setLoading(false)
  }, [isSignedIn, authLoaded, userLoaded, user, router])

  if (loading || !authLoaded || !userLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-primary/20 rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAdmin) {
    return null
  }

  return <AdminDashboard />
}
