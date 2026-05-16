require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const hash = bcrypt.hashSync('Admin@123', 10);
  await pool.query('DELETE FROM users WHERE username=$1', ['admin']);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hash]);
  console.log('Admin created successfully');
  process.exit();
}

run();