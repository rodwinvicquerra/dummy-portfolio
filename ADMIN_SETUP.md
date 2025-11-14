# Admin Role Setup Guide

This guide explains how to set up the admin role for your portfolio website using Clerk.

## Setting Yourself as Admin

To assign yourself as the admin user, you need to set the `role` in your user's **publicMetadata** in Clerk.

### Step-by-Step Instructions (Using Clerk Dashboard)

1. **Navigate to Users**
   - In your Clerk Dashboard, click on **"Users"** in the left sidebar (you should see the Users list page)

2. **Select Your User**
   - Find the user you want to make admin (e.g., "Kioshi Kenshin" or your own account)
   - Click on the user's name/row to open their profile page

3. **Find the Metadata Section**
   - On the user profile page, you'll see tabs on the left: **"Profile"** and **"Settings"**
   - **Option A: Check the Settings Tab**
     - Click on the **"Settings"** tab on the left sidebar
     - Look for a section called **"Metadata"** or **"User metadata"**
   - **Option B: Scroll Down on Profile Tab**
     - If you're on the **"Profile"** tab, scroll down past sections like:
       - Personal information
       - Email addresses
       - Social accounts
       - Password
       - Devices
     - The **"Metadata"** section should be at the bottom
   - **Note:** If you don't see a Metadata section, it might be collapsed or you may need to click "Show more" or expand sections

4. **Add Admin Role to Public Metadata**
   - In the **Metadata** section, find the **"Public metadata"** field
   - Click on it to edit
   - Add the following JSON:
     ```json
     {
       "role": "admin"
     }
     ```
   - If there's already content in Public metadata, merge it with the existing data:
     ```json
     {
       "existingKey": "existingValue",
       "role": "admin"
     }
     ```

5. **Save Changes**
   - Click **"Save"** or **"Update"** button
   - The changes should be saved immediately

6. **Verify the Role**
   - The user should now have `role: "admin"` in their publicMetadata
   - Sign out and sign back in to refresh the session
   - Try accessing `/admin` - you should now see the Admin Dashboard

### Option 2: Using Clerk API

You can also set the role programmatically using Clerk's API:

```typescript
import { clerkClient } from "@clerk/nextjs/server";

await clerkClient().users.updateUser("user_xxxxx", {
  publicMetadata: {
    role: "admin"
  }
});
```

## How It Works

- **Admin users**: Users with `role: "admin"` in their publicMetadata can access `/admin` and manage other users
- **Viewer users**: All other users (default) can only view the portfolio at `/portfolio`
- **New users**: When users sign up through Clerk, they automatically get the `viewer` role (or no role, which defaults to viewer)

## Testing

1. After setting your role to "admin", sign out and sign back in
2. Navigate to `/admin` - you should see the Admin Dashboard
3. Try accessing `/admin` with a viewer account - you should be redirected to `/portfolio`

## User Management

Once you're set as admin, you can:
- View all registered users in the Admin Dashboard
- Change user roles (admin/viewer)
- Delete user accounts
- See user activity (join date, last sign in)

All user management is done through the `/admin` page in the "Users" tab.

