import { sql } from '@vercel/postgres';

// Database connection utility for Vercel Neon
export { sql };

// Check if database connection is available
export const isDatabaseConnected = () => {
  return !!process.env.POSTGRES_URL;
};

// Simple user table creation (run this once in your database)
export const createTables = async () => {
  try {
    if (!isDatabaseConnected()) {
      throw new Error('Database connection string (POSTGRES_URL) is not configured. Please set it in your environment variables.');
    }
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

// User operations
export const createUser = async (email: string, password: string, name?: string) => {
  try {
    if (!isDatabaseConnected()) {
      throw new Error('Database connection string (POSTGRES_URL) is not configured. Please set it in your environment variables.');
    }
    const result = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${password}, ${name})
      RETURNING id, email, name, is_admin, created_at;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    if (!isDatabaseConnected()) {
      throw new Error('Database connection string (POSTGRES_URL) is not configured. Please set it in your environment variables.');
    }
    const result = await sql`
      SELECT id, email, name, is_admin, created_at, updated_at
      FROM users
      WHERE email = ${email};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    if (!isDatabaseConnected()) {
      throw new Error('Database connection string (POSTGRES_URL) is not configured. Please set it in your environment variables.');
    }
    const result = await sql`
      SELECT id, email, name, is_admin, created_at
      FROM users
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};
