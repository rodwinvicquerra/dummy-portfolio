"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Activity, Bell, Server, Eye, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function MCPSecurityPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <Shield className="h-4 w-4" />
            MCP Security Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OAuth-Protected MCP Architecture</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security documentation for Model Context Protocol integration with OAuth authentication, 
            rate limiting, logging, and incident response.
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Server className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Architecture Overview</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The MCP server is protected by a multi-layered security architecture that ensures only authenticated
              and authorized requests can access portfolio data and tools.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Authentication Layer</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Clerk OAuth 2.0 token validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Session-based user identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Automatic token refresh handling</span>
                  </li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Protection Layer</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Arcjet rate limiting (100 req/min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Bot detection and prevention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>SQL injection protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Logging Strategy */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Logging & Monitoring</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Request Logging</h3>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">[MCP] Authenticated request from user: user_abc123</div>
                <div className="text-blue-400">[MCP] Tool execution request: {'{'} userId, tool, timestamp {'}'}</div>
                <div className="text-yellow-400">[MCP] Rate limit check: 45/100 requests</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4">
                <Eye className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Access Logs</h4>
                <p className="text-sm text-muted-foreground">All API requests logged with user ID, timestamp, and IP</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mb-2" />
                <h4 className="font-semibold mb-1">Security Events</h4>
                <p className="text-sm text-muted-foreground">Failed auth attempts, rate limit violations tracked</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <Activity className="h-5 w-5 text-blue-500 mb-2" />
                <h4 className="font-semibold mb-1">Performance Metrics</h4>
                <p className="text-sm text-muted-foreground">Response times, error rates monitored in real-time</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Alerting System */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Alerting Configuration</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Automated alerts are configured for critical security events and anomalies.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Failed Authentication Spike",
                  threshold: "> 10 failures in 5 minutes",
                  severity: "high",
                  action: "Temporary IP block + admin notification"
                },
                {
                  title: "Rate Limit Exceeded",
                  threshold: "> 100 requests/minute per user",
                  severity: "medium",
                  action: "429 response + cooldown period"
                },
                {
                  title: "SQL Injection Attempt",
                  threshold: "Any detection",
                  severity: "critical",
                  action: "Request blocked + immediate admin alert"
                },
                {
                  title: "Unusual Access Pattern",
                  threshold: "Deviation from baseline",
                  severity: "medium",
                  action: "Log for review + pattern analysis"
                }
              ].map((alert, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "default" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Threshold:</strong> {alert.threshold}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Action:</strong> {alert.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Security Best Practices */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Security Best Practices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Token Management</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Tokens stored securely in HTTP-only cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Short-lived access tokens (1 hour expiry)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Automatic rotation with refresh tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Token revocation on logout/security events</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">API Security</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>HTTPS-only communication (TLS 1.3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>CORS configured for allowed origins only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Input validation and sanitization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Rate limiting per user and IP</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>For incident response procedures, see the <a href="/incident-response" className="text-primary hover:underline">Incident Response Runbook</a></p>
          <p className="mt-2">Last updated: November 10, 2025</p>
        </div>
      </div>
    </div>
  )
}
