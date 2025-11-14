# Vercel Environment Variables Setup Guide

## Required Environment Variables

### 1. POSTGRES_URL (Required)
- **Key:** `POSTGRES_URL`
- **How to get it:**
  1. Go to your Vercel project dashboard
  2. Click on **Storage** tab
  3. Click **Create Database** → Select **Postgres**
  4. After creating, click on your database
  5. Go to **Settings** tab
  6. Copy the **Connection String** (it will look like: `postgres://user:password@host:port/database?sslmode=require`)
- **Environments:** Select all (Production, Preview, Development)

### 2. JWT_SECRET (Required)
- **Key:** `JWT_SECRET`
- **How to generate:**
  - Use online generator: https://generate-secret.vercel.app/32
  - Or use terminal: `openssl rand -base64 32`
  - Or use Node.js: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- **Environments:** Select all (Production, Preview, Development)

### 3. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (If using Clerk)
- **Key:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **How to get it:**
  1. Go to https://dashboard.clerk.com
  2. Select your application
  3. Go to **API Keys**
  4. Copy the **Publishable key**
- **Environments:** Select all (Production, Preview, Development)

### 4. CLERK_SECRET_KEY (If using Clerk)
- **Key:** `CLERK_SECRET_KEY`
- **How to get it:**
  1. Go to https://dashboard.clerk.com
  2. Select your application
  3. Go to **API Keys**
  4. Copy the **Secret key**
- **Environments:** Select all (Production, Preview, Development)

## Step-by-Step Instructions

### In Vercel Dashboard:

1. **Navigate to Environment Variables:**
   - Go to your project → **Settings** → **Environment Variables**

2. **Add POSTGRES_URL:**
   - Click in the **Key** field → Type: `POSTGRES_URL`
   - Click in the **Value** field → Paste your database connection string
   - Select environments (Production, Preview, Development)
   - Click **Save**

3. **Add JWT_SECRET:**
   - Click **Add Another**
   - Key: `JWT_SECRET`
   - Value: Your generated secret (32+ characters)
   - Select environments
   - Click **Save**

4. **Add Clerk Variables (if needed):**
   - Repeat the process for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

5. **Redeploy:**
   - Go to **Deployments** tab
   - Click the three dots (⋯) on latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger automatic deployment

## Important Notes

- ⚠️ **A new deployment is required** for environment variable changes to take effect
- 🔒 For sensitive values, you can enable the **Sensitive** toggle to hide values after creation
- 🌍 Make sure to select the correct environments (Production, Preview, Development) for each variable
- ✅ After adding variables, always redeploy your application

## Troubleshooting

### If you see "missing_connection_string" error:
- Verify `POSTGRES_URL` is set correctly
- Check that you selected the right environments
- Make sure you redeployed after adding the variable

### If you see "DYNAMIC_SERVER_USAGE" error:
- This should be fixed in the code already
- Make sure you've pushed the latest code changes
- Redeploy after pushing

### If database operations fail:
- Verify your `POSTGRES_URL` connection string is correct
- Check that your database is accessible
- Ensure the database tables are created (run setup script or create manually)

