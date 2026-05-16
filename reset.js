require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function reset() {
  const hash = bcrypt.hashSync('Admin@123', 10);
  await pool.query('UPDATE users SET password=$1 WHERE username=$2', [hash, 'admin']);
  console.log('Password reset done');
  process.exit();
}

reset();