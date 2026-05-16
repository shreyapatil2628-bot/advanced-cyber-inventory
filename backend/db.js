const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../inventory.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;