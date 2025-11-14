# 🛡️ Secure Corporate Portfolio - Rodwin Vicquerra

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://clerk-portfolio-cleandesign-rodwin.vercel.app)
[![Security: Arcjet](https://img.shields.io/badge/Security-Arcjet-blue?style=for-the-badge)](https://arcjet.com)
[![Auth: Clerk](https://img.shields.io/badge/Auth-Clerk-purple?style=for-the-badge)](https://clerk.com)

## 🎯 Overview

A production-ready, security-hardened portfolio website featuring OAuth-protected MCP (Model Context Protocol) integration, enterprise-grade authentication, and comprehensive threat protection. Built with Next.js 14, TypeScript, and modern security best practices.

### 🔐 Security Features

- **OAuth 2.0 Authentication** via Clerk
- **MCP Server** with OAuth-protected endpoints (`/api/mcp`)
- **Rate Limiting** (100 req/min per user via Arcjet)
- **Bot Detection & Prevention** (Arcjet Shield)
- **SQL Injection Protection** (Automated blocking)
- **DDoS Mitigation** (Vercel Firewall + Rate Limiting)
- **Security Headers** (CSP, HSTS, X-Frame-Options, etc.)
- **Incident Response System** (Documented runbook)
- **Real-time Security Monitoring** (Logging & Alerting)

### 📊 Security Documentation

- **Architecture & Security**: Visit `/mcp-security` for detailed documentation
- **Incident Response**: See `INCIDENT_RESPONSE.md` for breach procedures
- **API Docs**: OAuth-protected MCP endpoints at `/api/mcp`

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Clerk account for authentication
- Arcjet account for security features

### Installation

```bash
# Clone repository
git clone https://github.com/rodwinvicquerra/clerk-portfolio-cleandesign-rodwin.git
cd clerk-portfolio-cleandesign-rodwin

# Install dependencies
pnpm install

# Set up environment variables (see below)
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit `http://localhost:3000`

---

## ⚙️ Environment Variables

### Required Variables

Create a `.env.local` file with the following:

### Required Variables

Create a `.env.local` file with the following:

```env
# Clerk Authentication (OAuth Provider)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Arcjet Security (Rate Limiting & Bot Protection)
ARCJET_KEY=ajkey_xxxxx

# Database (Vercel Postgres or Neon)
POSTGRES_URL=postgres://user:pass@host:5432/db?sslmode=require

# JWT Secret (for additional token signing)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change for production
```

### Getting API Keys

**Clerk (Authentication):**
1. Sign up at [clerk.com](https://clerk.com)
2. Create new application
3. Copy publishable & secret keys from dashboard
4. Configure OAuth providers (Google, GitHub, etc.)

**Arcjet (Security):**
1. Sign up at [arcjet.com](https://arcjet.com)
2. Create new site
3. Copy API key from dashboard
4. Configure rules (rate limiting, bot detection)

**Vercel Postgres:**
1. Go to Vercel Dashboard → Storage
2. Create Postgres database
3. Copy connection string (POSTGRES_URL)
4. Run migrations (see Database Setup below)

---

## 🗄️ Database Setup

Run the setup script to create required tables:

```bash
node scripts/setup-db.js
```

Or manually create tables using SQL from `lib/neon.ts`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1 + shadcn/ui
- **Authentication**: Clerk (OAuth 2.0)
- **Security**: Arcjet (Rate Limiting, Bot Detection, SQL Protection)
- **Database**: Vercel Postgres / Neon PostgreSQL
- **Deployment**: Vercel (Edge Functions + CDN)

### Security Architecture

```
┌─────────────────┐
│   Client        │
│  (Browser/MCP)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Vercel Firewall │ ◄── IP Filtering, Geo-blocking
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js         │
│ Middleware      │ ◄── Arcjet (Rate Limit, Bot Detection)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clerk OAuth     │ ◄── Token Validation
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ API Routes      │
│  /api/mcp       │ ◄── MCP Protocol Endpoints
│  /api/contact   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database        │
└─────────────────┘
```

### Authentication Flow

1. User clicks "Sign In" → Redirected to Clerk OAuth
2. User authenticates (Google/GitHub/Email)
3. Clerk issues JWT access token
4. Token stored in secure HTTP-only cookie
5. Middleware validates token on each request
6. Arcjet checks rate limits & bot patterns
7. API routes verify OAuth token before processing
8. Response sent back to client

---

## 🔒 Security Best Practices

### Implemented Protections

✅ **Rate Limiting**: 100 requests/minute per user  
✅ **Bot Detection**: Automated bot blocking (except search engines)  
✅ **SQL Injection**: Automated pattern detection & blocking  
✅ **CSRF Protection**: Built into Next.js App Router  
✅ **XSS Prevention**: Content Security Policy headers  
✅ **Clickjacking**: X-Frame-Options: DENY  
✅ **HTTPS Only**: Strict Transport Security (HSTS)  
✅ **Token Security**: HTTP-only cookies, 1-hour expiry  
✅ **Session Management**: Automatic rotation & revocation  

### Security Headers (Vercel)

All responses include security headers via `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=63072000`
- `Content-Security-Policy: ...`

---

## 📡 MCP API Documentation

### OAuth-Protected Endpoints

**Base URL**: `/api/mcp`

#### GET /api/mcp
List available MCP tools and server capabilities.

**Authentication**: Required (Clerk OAuth token)

**Response**:
```json
{
  "protocolVersion": "2024-11-05",
  "serverInfo": {
    "name": "Rodwin Portfolio MCP Server",
    "version": "1.0.0"
  },
  "tools": [
    {
      "name": "portfolio_data",
      "description": "Get portfolio information"
    },
    {
      "name": "contact_form",
      "description": "Submit contact form"
    }
  ],
  "authenticated": true,
  "userId": "user_xxxxx"
}
```

#### POST /api/mcp
Execute MCP tool calls.

**Authentication**: Required

**Request**:
```json
{
  "tool": "portfolio_data",
  "arguments": {
    "section": "projects"
  }
}
```

**Response**:
```json
{
  "success": true,
  "tool": "portfolio_data",
  "result": { "section": "projects", "data": "..." },
  "executedBy": "user_xxxxx",
  "timestamp": "2025-11-10T12:00:00Z"
}
```

**Error Responses**:
- `401 Unauthorized`: Missing/invalid OAuth token
- `404 Not Found`: Tool does not exist
- `429 Too Many Requests`: Rate limit exceeded
- `403 Forbidden`: Bot detected or security violation

---

## 🚨 Incident Response

### Quick Actions

**Token Compromise:**
```bash
# Revoke user session via Clerk Dashboard
# Or programmatically:
await clerkClient.sessions.revokeSession(sessionId)
```

**Rate Limit Abuse:**
```bash
# Block IP via Vercel CLI
vercel firewall add-rule --ip xxx.xxx.xxx.xxx --action deny
```

**Emergency Rollback:**
```bash
vercel rollback
```

**Full Incident Response:** See `INCIDENT_RESPONSE.md`

---

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rodwinvicquerra/clerk-portfolio-cleandesign-rodwin)

1. **Click "Deploy" button** above
2. **Set environment variables** in Vercel dashboard
3. **Configure domains** (optional)
4. **Enable Vercel Firewall** (Pro plan)
5. **Monitor logs** via Vercel dashboard

### Production Checklist

- [ ] All environment variables set (Clerk, Arcjet, Database)
- [ ] Database tables created & migrated
- [ ] Clerk production keys configured
- [ ] Arcjet rules enabled (LIVE mode)
- [ ] Vercel firewall rules active
- [ ] Custom domain configured with SSL
- [ ] Security headers verified (`/mcp-security`)
- [ ] Rate limiting tested
- [ ] Incident response team briefed
- [ ] Monitoring alerts configured

---

## 🧪 Testing

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Test security headers
curl -I https://your-domain.com

# Test MCP endpoint (requires auth)
curl -X GET https://your-domain.com/api/mcp \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📚 Project Structure

```
portfolio-react-rod/
├── app/
│   ├── api/
│   │   ├── mcp/route.ts          # OAuth-protected MCP server
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── admin/                # Admin routes
│   ├── mcp-security/page.tsx     # Security documentation
│   ├── portfolio/page.tsx        # Main portfolio
│   └── layout.tsx                # Root layout
├── components/
│   ├── sections/                 # Portfolio sections
│   ├── layout/                   # Navigation, Footer
│   └── ui/                       # shadcn/ui components
├── middleware.ts                 # Arcjet + Clerk middleware
├── vercel.json                   # Firewall & security headers
├── INCIDENT_RESPONSE.md          # Security runbook
└── README.md                     # This file
```

---

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

### Security Issues

**DO NOT** open public issues for security vulnerabilities.  
Email: [your-email@example.com] with details.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Rodwin Vicquerra**  
3rd Year IT Student | Full Stack Developer

- GitHub: [@rodwinvicquerra](https://github.com/rodwinvicquerra)
- Portfolio: [https://clerk-portfolio-cleandesign-rodwin.vercel.app](https://clerk-portfolio-cleandesign-rodwin.vercel.app)
- LinkedIn: [Connect with me](#)

---

## 📈 Week 8 Deliverables ✅

- [x] Production URL with OAuth-protected MCP endpoints (`/api/mcp`)
- [x] `/mcp-security` page documenting architecture, logging, and alerting
- [x] Arcjet and Vercel Firewall configurations
- [x] Incident response runbook covering token compromise scenarios
- [x] Updated GitHub repository with security-focused README

**Last Updated**: November 10, 2025  
**Version**: 2.0.0 (Corporate Redesign + Security Hardening)
