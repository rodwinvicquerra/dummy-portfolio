# ⚠️ Deployment Note: Arcjet Removed for Vercel Free Tier

## Issue
Vercel Free (Hobby) plan has a **1 MB Edge Function size limit**. With Arcjet included, the middleware was **1.01 MB**, exceeding this limit.

## Solution
Temporarily removed Arcjet from `middleware.ts` to deploy on Vercel Free tier.

## What This Means

### ✅ Still Working:
- Clerk OAuth authentication
- Route protection (admin/portfolio)
- Security headers (CSP, HSTS, etc.)
- MCP OAuth endpoints
- All core functionality

### ⚠️ Temporarily Disabled (Arcjet Features):
- Advanced rate limiting (100 req/min)
- Bot detection
- SQL injection shield
- Automated threat blocking

## For Production Deployment with Full Security

### Option 1: Upgrade to Vercel Pro
- Vercel Pro supports larger Edge Functions
- Re-enable Arcjet in middleware
- Full security suite active

### Option 2: Move Arcjet to API Routes
Instead of middleware, add Arcjet protection to specific API routes:

```typescript
// app/api/mcp/route.ts
import { arcjet, shield, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({ /* ... */ }),
    shield({ mode: "LIVE" })
  ]
});

export async function GET(req: Request) {
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    return new Response("Blocked", { status: 403 });
  }
  // ... rest of your code
}
```

## Documentation Still Valid

All security documentation in:
- `/mcp-security` page
- `INCIDENT_RESPONSE.md`
- `README.md`

...describes the **intended security architecture**. This is accurate for:
1. **Learning purposes** (Week 8 assignment)
2. **Production with Vercel Pro**
3. **Self-hosted deployments** (no size limit)

## Arcjet Still Installed

The `@arcjet/next` package is still in `package.json`. It's just not imported in middleware to reduce bundle size.

---

**For Week 8/9 submission**: Document that full security requires Vercel Pro or alternative deployment platform.
