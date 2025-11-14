import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: Arcjet removed to reduce middleware size for Vercel Free tier (1MB limit)
// For production deployment with Arcjet, upgrade to Vercel Pro
// Arcjet provides: Rate limiting, Bot detection, SQL injection protection

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)", 
  "/api/public(.*)",
  "/mcp-security", // Make security docs public
  "/security(.*)", // Security pages check role internally
  "/mcp-integration(.*)", // MCP pages check role internally
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin routes - check for admin role
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();
    
    if (!userId) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if user has admin role in publicMetadata (case-insensitive)
    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const role = (publicMetadata?.role || 'viewer').toLowerCase();
    
    if (role !== "admin") {
      // Redirect non-admin users to portfolio
      return NextResponse.redirect(new URL("/portfolio", req.url));
    }
  }

  // For other protected routes (like /portfolio), just require authentication
  const { userId } = await auth();
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Protect /portfolio route - require authentication
  if (req.nextUrl.pathname.startsWith("/portfolio")) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)",
    "/api/(.*)"
  ],
};
