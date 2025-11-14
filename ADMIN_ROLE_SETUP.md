# Admin Role Setup Guide for Clerk

## 🎯 Quick Setup (5 Minutes)

### Step 1: Set Your Admin Role in Clerk Dashboard

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your application**: "portfolio-react-rod" or your app name
3. **Navigate to**: `Users` (left sidebar)
4. **Find your user account** (the one you use to login)
5. **Click on your username** to open user details
6. **Scroll down to "Public Metadata"** section
7. **Click "Edit"** button
8. **Add this JSON**:
   ```json
   {
     "role": "admin"
   }
   ```
9. **Click "Save"**

### Step 2: Verify It Works

1. **Sign out** of your portfolio (if already signed in)
2. **Sign in again** (this refreshes your session with new metadata)
3. **You should now see** "Security" link in navigation
4. **Click it** - you'll have full access to `/security` page
5. **Try `/mcp-integration`** - also accessible now

---

## 🔐 How It Works

### Admin Users (You):
- ✅ Public metadata: `{"role": "admin"}`
- ✅ See "Security" in navigation
- ✅ Access `/security` page
- ✅ Access `/mcp-integration` page
- ✅ Access `/admin` dashboard

### Regular Users (New Registrations):
- ❌ Public metadata: `{}` (empty or no role)
- ❌ "Security" link hidden in navigation
- ❌ Blocked from `/security` → "Access Denied" page
- ❌ Blocked from `/mcp-integration` → "Access Denied"
- ✅ Can access: Home, Portfolio, Projects, Contact

---

## 👥 How to Add More Admins (Optional)

1. Go to Clerk Dashboard → Users
2. Find the user you want to promote
3. Click their name
4. Edit "Public Metadata"
5. Add: `{"role": "admin"}`
6. User must sign out and sign in again to get admin access

---

## 🧪 Testing Instructions

### Test as Admin (You):
```bash
1. Set your metadata to {"role": "admin"} in Clerk
2. Sign out and sign in again
3. Navigate to https://your-domain.vercel.app
4. You should see "Security" link in nav
5. Click it - full access to security dashboard
```

### Test as Regular User:
```bash
1. Open incognito/private browser window
2. Go to your deployed site
3. Register a NEW account (don't add admin metadata)
4. After registration, check navigation
5. "Security" link should NOT appear
6. Try manually typing /security in URL
7. Should see "Access Denied" page with Lock icon
```

---

## 📝 Important Notes

### Middleware Protection:
- Routes `/security` and `/mcp-integration` are protected in `middleware.ts`
- Middleware checks role BEFORE page loads
- Non-admins are redirected to `/portfolio`

### Page-Level Protection:
- Both pages also check role in component
- Double protection: middleware + page component
- Shows "Access Denied" UI if somehow bypassed

### Session Refresh:
- **IMPORTANT**: After changing metadata in Clerk, user MUST sign out and sign in again
- New role won't apply to existing sessions
- This is a Clerk security feature

---

## 🚀 Deployment Checklist

Before deploying to Vercel:

- [ ] Set your Clerk metadata to `{"role": "admin"}`
- [ ] Sign out and sign in to refresh session
- [ ] Verify you can see "Security" link
- [ ] Test accessing `/security` page
- [ ] Test accessing `/mcp-integration` page
- [ ] Create test user account WITHOUT admin role
- [ ] Verify test user CANNOT see "Security" link
- [ ] Verify test user gets "Access Denied" on `/security`
- [ ] Push to GitHub (Vercel auto-deploys)

---

## 🔧 Troubleshooting

### "Security link doesn't appear after setting admin role"
**Solution**: Sign out and sign in again. Metadata changes don't apply to active sessions.

### "I see Security link but get Access Denied"
**Solution**: 
1. Check Clerk dashboard - is metadata exactly `{"role": "admin"}`? (lowercase, no typos)
2. Try signing out and in again
3. Check browser console for errors

### "New users can access /security"
**Solution**: 
1. Check middleware.ts - are routes protected?
2. Verify new users DON'T have admin metadata
3. Clear browser cache and test in incognito

---

## 📊 Current Implementation

**Protected Routes:**
- `/security` - Security showcase dashboard
- `/mcp-integration` - MCP demo and docs
- `/admin` - Admin panel (existing)
- `/api/admin/*` - Admin API routes (existing)

**Public Routes:**
- `/` - Homepage
- `/portfolio` - Portfolio page
- `/mcp-security` - Technical docs (public for educational purposes)
- `/contact` - Contact form
- `/sign-in`, `/sign-up` - Authentication pages

**Files Modified:**
1. `middleware.ts` - Added `/security` and `/mcp-integration` to admin routes
2. `app/security/page.tsx` - Added role check, shows AccessDenied component
3. `app/mcp-integration/page.tsx` - Added role check, shows AccessDenied component
4. `components/layout/Navigation.tsx` - Filter "Security" link based on admin role
5. `components/common/AccessDenied.tsx` - New component for unauthorized access

---

**Ready to deploy?** Set your admin metadata in Clerk, then push to GitHub! 🚀
