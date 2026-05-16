const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      item_id TEXT UNIQUE NOT NULL,
      item_name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      enter_date TEXT NOT NULL,
      original_quantity INTEGER NOT NULL,
      quantity_received INTEGER NOT NULL,
      remaining_quantity INTEGER NOT NULL,
      used_quantity INTEGER DEFAULT 0,
      saved TEXT DEFAULT 'yes',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

init();
module.exports = pool;