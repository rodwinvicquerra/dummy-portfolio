# 🚨 Incident Response Runbook

## Table of Contents
1. [Overview](#overview)
2. [Token Compromise Scenarios](#token-compromise-scenarios)
3. [Breach Detection](#breach-detection)
4. [Response Procedures](#response-procedures)
5. [Recovery Steps](#recovery-steps)
6. [Post-Incident Review](#post-incident-review)

---

## Overview

This runbook provides step-by-step procedures for responding to security incidents in the Clerk Portfolio MCP application. All incidents should be treated seriously and documented thoroughly.

### Incident Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P0 - Critical** | Active breach, data exposure | Immediate (< 15 min) | Token compromise, database breach |
| **P1 - High** | Potential breach, elevated risk | < 1 hour | Multiple failed auth attempts, DDoS |
| **P2 - Medium** | Security policy violation | < 4 hours | Rate limit abuse, suspicious patterns |
| **P3 - Low** | Minor security event | < 24 hours | Single failed login, config warning |

---

## Token Compromise Scenarios

### Scenario 1: OAuth Access Token Leaked

**Detection Signs:**
- Unusual API activity from unfamiliar IPs
- Access tokens used in unexpected locations
- User reports unauthorized access

**Immediate Actions:**
1. **Revoke compromised token** (< 5 minutes)
   ```bash
   # Via Clerk Dashboard
   Dashboard → Users → Select User → Sessions → Revoke Session
   ```

2. **Force logout affected user**
   ```javascript
   // API call to force sign-out
   await clerkClient.sessions.revokeSession(sessionId)
   ```

3. **Block IP address** (if identified)
   ```json
   // Add to vercel.json firewall
   {
     "condition": { "type": "ip", "value": "xxx.xxx.xxx.xxx" },
     "action": { "type": "deny" }
   }
   ```

4. **Enable MFA** for affected account
5. **Notify user** via email about security incident

**Investigation:**
- Review access logs for token usage timeline
- Check for data exfiltration attempts
- Identify entry point (phishing, XSS, etc.)

---

### Scenario 2: Clerk API Key Exposure

**Detection Signs:**
- API key found in public repository
- Unexpected Clerk API usage charges
- Alerts from security scanning tools

**Immediate Actions (P0 - < 15 minutes):**

1. **Rotate API key immediately**
   ```bash
   # Clerk Dashboard
   1. Navigate to API Keys
   2. Click "Rotate Secret Key"
   3. Update environment variables
   ```

2. **Update environment variables**
   ```bash
   # Vercel Dashboard
   Settings → Environment Variables → Update:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
   ```

3. **Redeploy application**
   ```bash
   git commit -m "Security: Rotate Clerk API keys"
   git push
   # Vercel auto-deploys
   ```

4. **Audit all users created in last 24 hours**
   ```javascript
   // Check for suspicious accounts
   const recentUsers = await clerkClient.users.getUserList({
     createdAt: { $gte: Date.now() - 86400000 }
   })
   ```

5. **Enable IP allowlisting** in Clerk Dashboard

**Prevention:**
- Never commit `.env` files
- Use `.env.local` for secrets
- Enable GitHub secret scanning
- Rotate keys quarterly

---

### Scenario 3: Session Hijacking

**Detection Signs:**
- Multiple sessions from different countries simultaneously
- Session cookies accessed from unusual devices
- User reports being logged out unexpectedly

**Immediate Actions:**

1. **Terminate all sessions** for affected user
   ```javascript
   const sessions = await clerkClient.users.getUserSessionList(userId)
   for (const session of sessions) {
     await clerkClient.sessions.revokeSession(session.id)
   }
   ```

2. **Force password reset**
   ```javascript
   await clerkClient.users.updateUser(userId, {
     passwordEnabled: false // Triggers reset flow
   })
   ```

3. **Review session logs**
   ```bash
   # Check Vercel logs
   vercel logs --since 24h | grep "session"
   ```

4. **Enable 2FA requirement**
   ```javascript
   await clerkClient.users.updateUser(userId, {
     publicMetadata: { requireMFA: true }
   })
   ```

---

## Breach Detection

### Automated Monitoring

**Log Analysis Commands:**
```bash
# Check for failed auth attempts
vercel logs | grep "AUTH_FAILED" | wc -l

# Monitor rate limit violations
vercel logs | grep "Rate Limit Exceeded"

# Detect SQL injection attempts
vercel logs | grep "SQL injection"

# Check for unusual IP patterns
vercel logs | awk '{print $1}' | sort | uniq -c | sort -nr
```

### Alert Thresholds

Set up monitoring for:
- **> 10 failed logins** in 5 minutes → Investigate
- **> 100 requests/minute** from single IP → Block temporarily
- **Any SQL injection pattern** detected → Immediate block
- **Access from blacklisted IPs** → Auto-deny

### Tools
- Vercel Analytics for traffic patterns
- Clerk Dashboard for auth anomalies
- Arcjet logs for security events

---

## Response Procedures

### Step-by-Step Incident Response

#### 1. **Detection & Triage** (0-15 minutes)
- [ ] Confirm incident is legitimate (not false positive)
- [ ] Determine severity level (P0-P3)
- [ ] Notify incident response team
- [ ] Begin incident log documentation

#### 2. **Containment** (15-30 minutes)
- [ ] Isolate affected systems/accounts
- [ ] Revoke compromised credentials
- [ ] Block malicious IPs
- [ ] Preserve evidence (logs, screenshots)

#### 3. **Eradication** (30 minutes - 2 hours)
- [ ] Remove attacker access points
- [ ] Patch vulnerabilities
- [ ] Reset affected credentials
- [ ] Deploy security updates

#### 4. **Recovery** (2-6 hours)
- [ ] Restore services to normal operation
- [ ] Verify security controls working
- [ ] Monitor for re-compromise attempts
- [ ] Communicate with affected users

#### 5. **Post-Incident** (6-24 hours)
- [ ] Complete incident report
- [ ] Conduct root cause analysis
- [ ] Implement preventive measures
- [ ] Update security documentation

---

## Recovery Steps

### System Recovery Checklist

After an incident is contained, follow these steps to restore full operations:

**Security Hardening:**
```bash
# 1. Update all dependencies
pnpm update

# 2. Run security audit
pnpm audit

# 3. Check for vulnerabilities
npm audit fix --force

# 4. Rebuild application
pnpm build

# 5. Deploy to staging first
vercel --prod=false

# 6. Run security tests
pnpm test:security

# 7. Deploy to production
vercel --prod
```

**Credential Rotation:**
1. Rotate all API keys (Clerk, Arcjet, Database)
2. Invalidate all existing sessions
3. Force password reset for affected users
4. Re-enable services gradually

**Monitoring Enhancement:**
1. Add alerts for similar patterns
2. Increase logging verbosity temporarily
3. Enable additional security features
4. Schedule security review

---

## Post-Incident Review

### Incident Report Template

```markdown
## Incident Report #[NUMBER]

**Date:** [YYYY-MM-DD]
**Severity:** [P0/P1/P2/P3]
**Status:** [Resolved/Ongoing/Monitoring]

### Summary
[Brief description of what happened]

### Timeline
- [HH:MM] Incident detected
- [HH:MM] Response initiated
- [HH:MM] Containment completed
- [HH:MM] Services restored

### Impact
- Users affected: [number]
- Data exposed: [Yes/No - details]
- Downtime: [duration]

### Root Cause
[Technical explanation of how breach occurred]

### Response Actions Taken
1. [Action 1]
2. [Action 2]
...

### Preventive Measures
1. [Measure 1]
2. [Measure 2]
...

### Lessons Learned
[What went well, what could improve]
```

---

## Emergency Contacts

### Incident Response Team

| Role | Contact | Availability |
|------|---------|--------------|
| **Security Lead** | Rodwin Vicquerra | 24/7 |
| **Clerk Support** | support@clerk.dev | Business hours |
| **Vercel Support** | security@vercel.com | 24/7 |
| **Arcjet Support** | support@arcjet.com | Business hours |

### Escalation Path

1. **Tier 1**: Automated alerts → On-call engineer
2. **Tier 2**: P1/P0 incidents → Security lead
3. **Tier 3**: Data breach → Legal/Compliance team
4. **Tier 4**: Major incident → Executive team

---

## Quick Reference Commands

### Emergency Actions
```bash
# Revoke all sessions
curl -X POST https://api.clerk.com/v1/sessions/revoke_all \
  -H "Authorization: Bearer $CLERK_SECRET_KEY"

# Block IP immediately
vercel firewall add-rule --ip xxx.xxx.xxx.xxx --action deny

# Check recent logs
vercel logs --since 1h | grep -i "error\|unauthorized\|suspicious"

# Deploy rollback
vercel rollback

# Check active users
curl https://api.clerk.com/v1/users?limit=100 \
  -H "Authorization: Bearer $CLERK_SECRET_KEY"
```

---

## Compliance & Legal

### Data Breach Notification Requirements

If personal data is compromised:
- **Within 72 hours**: Notify data protection authority (if GDPR applies)
- **Without undue delay**: Inform affected users
- **Document**: All breach details and response actions

### Evidence Preservation

For potential legal proceedings:
1. Take screenshots of all logs
2. Export full log files with timestamps
3. Document all actions taken
4. Preserve system snapshots
5. Record communication timeline

---

**Last Updated:** November 10, 2025  
**Version:** 1.0  
**Owner:** Rodwin Vicquerra

**Note:** This runbook should be reviewed and updated quarterly or after any major incident.
