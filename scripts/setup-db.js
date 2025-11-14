// Setup script for Vercel Neon database
// Run this once to create tables: node scripts/setup-db.js

import { createTables } from '../lib/neon.js';

async function setup() {
  console.log('Setting up database tables...');
  await createTables();
  console.log('Database setup complete!');
  process.exit(0);
}

setup().catch(console.error);
