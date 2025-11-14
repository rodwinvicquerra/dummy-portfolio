import { validateEnv } from './lib/security';

// Validate environment variables on startup
if (typeof window === 'undefined') {
  // Only run on server-side
  validateEnv();
}

export {};