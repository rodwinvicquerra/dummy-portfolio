"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Link from "next/link"
import { BarChart3, FileText, Users, Trash2, Shield, User as UserIcon } from "lucide-react"
import { toast } from "sonner"

interface ClerkUser {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: string[]
  imageUrl: string
  role: string
  createdAt: number
  lastSignInAt: number | null
}

export function AdminDashboard() {
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<ClerkUser[]>([])
  const [loading, setLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(false)

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers()
    }
  }, [activeTab])

  const fetchUsers = async () => {
    setUsersLoading(true)
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      } else {
        toast.error("Failed to fetch users")
      }
    } catch (err) {
      console.error("Failed to fetch users", err)
      toast.error("Failed to fetch users")
    } finally {
      setUsersLoading(false)
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUserId: userId,
          action: "updateRole",
          newRole: newRole,
        }),
      })

      if (response.ok) {
        toast.success("User role updated successfully")
        fetchUsers() // Refresh users list
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update user role")
      }
    } catch (err) {
      console.error("Failed to update user role", err)
      toast.error("Failed to update user role")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUserId: userId,
          action: "delete",
        }),
      })

      if (response.ok) {
        toast.success("User deleted successfully")
        fetchUsers() // Refresh users list
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to delete user")
      }
    } catch (err) {
      console.error("Failed to delete user", err)
      toast.error("Failed to delete user")
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/sign-in")
  }

  if (loading && activeTab === "overview") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.emailAddresses[0]?.emailAddress || "Admin"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => window.location.href = '/'} 
              className="text-xl font-bold hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Portfolio Admin
            </button>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === "overview"
                    ? "border-accent text-foreground scale-105"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === "users"
                    ? "border-accent text-foreground scale-105"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === "portfolio"
                    ? "border-accent text-foreground scale-105"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Portfolio
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground animate-fade-in">Welcome, {userName}!</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-red-500/10 hover:text-red-500 transition-all"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer border-0 bg-linear-to-br from-card to-card/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    Total Users
                  </h3>
                  <p className="text-3xl font-bold text-accent">{users.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Registered Users</p>
                </div>
                <Users className="h-8 w-8 text-accent/40 group-hover:text-accent transition-all duration-300" />
              </div>
            </Card>
            <Card
              className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer border-0 bg-linear-to-br from-card to-card/50"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Portfolio Stats</h3>
                  <p className="text-3xl font-bold text-accent">5</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
                <BarChart3 className="h-8 w-8 text-accent/40 group-hover:text-accent transition-all duration-300" />
              </div>
            </Card>
            <Card
              className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer border-0 bg-linear-to-br from-card to-card/50"
              style={{ animationDelay: "200ms" }}
            >
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-primary/10 transition-all"
                    onClick={() => {
                      window.location.href = '/portfolio';
                    }}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                User Management
              </h2>
              <Button
                onClick={fetchUsers}
                variant="outline"
                size="sm"
                disabled={usersLoading}
              >
                {usersLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
            
            {usersLoading ? (
              <Card className="p-8 text-center">
                <div className="animate-pulse">Loading users...</div>
              </Card>
            ) : users.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <p className="text-muted-foreground">No users found.</p>
              </Card>
            ) : (
              <Card className="border-0 bg-linear-to-br from-card to-card/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userItem) => (
                      <TableRow key={userItem.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {userItem.imageUrl ? (
                              <img
                                src={userItem.imageUrl}
                                alt={userItem.firstName || "User"}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <UserIcon className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">
                                {userItem.firstName && userItem.lastName
                                  ? `${userItem.firstName} ${userItem.lastName}`
                                  : userItem.emailAddresses[0] || "User"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{userItem.emailAddresses[0] || "N/A"}</TableCell>
                        <TableCell>
                          <Select
                            value={userItem.role}
                            onValueChange={(newRole) => handleRoleChange(userItem.id, newRole)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4" />
                                  Admin
                                </div>
                              </SelectItem>
                              <SelectItem value="viewer">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4" />
                                  Viewer
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {userItem.createdAt
                            ? new Date(userItem.createdAt).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {userItem.lastSignInAt
                            ? new Date(userItem.lastSignInAt).toLocaleDateString()
                            : "Never"}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                disabled={userItem.id === user?.id}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user account
                                  {userItem.firstName && ` for ${userItem.firstName} ${userItem.lastName}`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(userItem.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Portfolio Management
            </h2>
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground mb-4">Portfolio editing features coming soon.</p>
              <Button asChild>
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

