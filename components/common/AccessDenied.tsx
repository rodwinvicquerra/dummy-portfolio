import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="max-w-2xl w-full p-8 text-center border-2 border-destructive/20">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Shield className="h-24 w-24 text-muted-foreground" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="h-12 w-12 text-destructive" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-lg text-muted-foreground">
            You don't have permission to access this page
          </p>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
          <h2 className="text-sm font-semibold mb-3 text-primary">Admin Access Required</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This page contains sensitive security information and administration features. 
            Only users with administrator privileges can access this content.
          </p>
          <div className="flex items-start gap-3 text-left">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              If you believe you should have access to this page, please contact the site administrator 
              to request elevated permissions.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/portfolio">
              View Portfolio
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
