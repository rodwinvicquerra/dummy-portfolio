/**
 * Set Admin Role Script
 * Run this ONCE to set your admin role in Clerk
 * 
 * Usage:
 * 1. Make sure you're signed in to your app
 * 2. Open browser DevTools Console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Check the console for success message
 */

// Get your user ID from Clerk
async function setAdminRole() {
  try {
    // This will only work if you're on a page with Clerk loaded
    if (typeof window.Clerk === 'undefined') {
      console.error('❌ Clerk not loaded. Make sure you\'re on your portfolio site and signed in.');
      return;
    }

    const user = window.Clerk.user;
    
    if (!user) {
      console.error('❌ No user signed in. Please sign in first.');
      return;
    }

    console.log('📝 Current user ID:', user.id);
    console.log('📝 Current metadata:', user.publicMetadata);

    // Update metadata
    await user.update({
      publicMetadata: {
        role: 'admin'
      }
    });

    console.log('✅ Admin role set successfully!');
    console.log('📝 New metadata:', user.publicMetadata);
    console.log('⚠️  IMPORTANT: Sign out and sign in again to apply changes!');
    
  } catch (error) {
    console.error('❌ Error setting admin role:', error);
    console.log('💡 Try setting it manually in Clerk Dashboard instead.');
  }
}

// Run the function
setAdminRole();
