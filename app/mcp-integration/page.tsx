import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Server, Code, Play, FileCode, ArrowRight, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"
import { AccessDenied } from "@/components/common"

export const metadata: Metadata = {
  title: "MCP Integration Demo - Rodwin Vicquerra",
  description: "Interactive demonstration of OAuth-protected Model Context Protocol server implementation with secure authentication, tool execution, and comprehensive API documentation.",
  openGraph: {
    title: "MCP Integration Demo - Rodwin Vicquerra",
    description: "OAuth-protected MCP server with interactive API demo and technical documentation",
  },
}

export default async function MCPIntegrationPage() {
  // Get current user with metadata
  const user = await currentUser()
  
  if (!user) {
    return <AccessDenied />
  }

  // Check for admin role in publicMetadata (case-insensitive)
  const publicMetadata = user.publicMetadata as { role?: string } | undefined
  const role = (publicMetadata?.role || 'viewer').toLowerCase()
  
  if (role !== 'admin') {
    return <AccessDenied />
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <Server className="h-4 w-4" />
            MCP Integration Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OAuth-Protected MCP Server</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interactive demonstration of Model Context Protocol implementation with secure authentication
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">System Architecture</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Client Request</h3>
              <p className="text-sm text-muted-foreground">User authenticates via Clerk OAuth</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">MCP Server</h3>
              <p className="text-sm text-muted-foreground">Validates token & processes request</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Authorized Response</h3>
              <p className="text-sm text-muted-foreground">Data returned with security headers</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Unauthorized Block</h3>
              <p className="text-sm text-muted-foreground">401 error with rate limiting</p>
            </div>
          </div>
        </Card>

        {/* Interactive Demo */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Interactive API Demo</h2>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">MCP Protocol</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implements Model Context Protocol specification with GET/POST methods
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">OAuth Security</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Clerk authentication validates every request before processing
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Type-Safe</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full TypeScript implementation with proper error handling
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">GET</Badge>
                      <code className="text-sm font-mono">/api/mcp</code>
                    </div>
                    <Badge>Public</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">List available MCP tools and capabilities</p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    curl https://your-domain.vercel.app/api/mcp
                  </code>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">POST</Badge>
                      <code className="text-sm font-mono">/api/mcp</code>
                    </div>
                    <Badge variant="destructive">Protected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Execute MCP tool (requires OAuth token)</p>
                  <code className="text-xs bg-muted p-2 rounded block overflow-x-auto">
                    {`curl -X POST https://your-domain.vercel.app/api/mcp \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"tool": "echo", "params": {"message": "Hello"}}'`}
                  </code>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">OPTIONS</Badge>
                      <code className="text-sm font-mono">/api/mcp</code>
                    </div>
                    <Badge>Public</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">CORS preflight for cross-origin requests</p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    curl -X OPTIONS https://your-domain.vercel.app/api/mcp
                  </code>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="space-y-4 mt-6">
              <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-slate-300">
{`// app/api/mcp/route.ts
import { auth } from "@clerk/nextjs"

export async function POST(request: Request) {
  // Authenticate user
  const { userId } = await auth()
  
  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    )
  }

  // Parse request
  const body = await request.json()
  const { tool, params } = body

  // Execute tool
  const result = await executeTool(tool, params)

  // Return response with security headers
  return new Response(
    JSON.stringify(result),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff"
      }
    }
  )
}`}
                </pre>
              </div>
              <Button asChild variant="outline" className="w-full gap-2">
                <a href="https://github.com/rodwinvicquerra/week8-echa-full-security-rodwinviquerra/blob/main/app/api/mcp/route.ts" target="_blank" rel="noopener noreferrer">
                  <FileCode className="h-4 w-4" />
                  View Full Source Code
                </a>
              </Button>
            </TabsContent>

            <TabsContent value="test" className="space-y-4 mt-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live API Tester</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  To test the MCP API, you'll need to authenticate first. Click below to sign in and get your access token.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/sign-in">
                      <Lock className="h-4 w-4 mr-2" />
                      Sign In to Test
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/mcp-security">
                      View Documentation
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Testing Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Sign in using the button above to get authenticated</li>
                  <li>Use browser DevTools Network tab to capture the Authorization header</li>
                  <li>Copy your Bearer token from any API request</li>
                  <li>Use curl or Postman to test the /api/mcp endpoint</li>
                  <li>See the technical documentation for detailed examples</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Available Tools */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Available MCP Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">echo</h4>
                <Badge variant="outline">Simple</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Returns the input message back to the caller</p>
              <code className="text-xs bg-muted p-2 rounded block">
                {`{"tool": "echo", "params": {"message": "test"}}`}
              </code>
            </div>

            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">getCurrentUser</h4>
                <Badge variant="outline">Protected</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Returns authenticated user information from Clerk</p>
              <code className="text-xs bg-muted p-2 rounded block">
                {`{"tool": "getCurrentUser", "params": {}}`}
              </code>
            </div>

            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">getSystemInfo</h4>
                <Badge variant="outline">Public</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Returns system status and version information</p>
              <code className="text-xs bg-muted p-2 rounded block">
                {`{"tool": "getSystemInfo", "params": {}}`}
              </code>
            </div>

            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">calculateHash</h4>
                <Badge variant="outline">Utility</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Generate SHA-256 hash of input string</p>
              <code className="text-xs bg-muted p-2 rounded block">
                {`{"tool": "calculateHash", "params": {"input": "text"}}`}
              </code>
            </div>
          </div>
        </Card>

        {/* Security Features */}
        <Card className="p-8 mb-8 bg-muted/30">
          <h2 className="text-2xl font-bold mb-6">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">OAuth Token Validation</h4>
                <p className="text-sm text-muted-foreground">Every POST request requires valid Clerk authentication token</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Request Logging</h4>
                <p className="text-sm text-muted-foreground">All API calls logged with timestamp, user ID, and tool name</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Error Handling</h4>
                <p className="text-sm text-muted-foreground">Comprehensive error handling with detailed status codes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">CORS Configuration</h4>
                <p className="text-sm text-muted-foreground">Proper CORS headers for secure cross-origin requests</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Related Resources */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-4">Security Dashboard</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View overall security implementation and metrics
            </p>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link href="/security">
                View Dashboard
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-4">Technical Docs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete MCP security architecture and setup guide
            </p>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link href="/mcp-security">
                Read Docs
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-4">Source Code</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse the complete implementation on GitHub
            </p>
            <Button asChild variant="outline" className="w-full gap-2">
              <a href="https://github.com/rodwinvicquerra/week8-echa-full-security-rodwinviquerra" target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}