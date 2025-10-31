const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');
const bcrypt = require('bcrypt');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT,
    status TEXT,
    dueDate TEXT,
    userId INTEGER NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  const demoPassword = bcrypt.hashSync('kalyani123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ['kalyani', demoPassword]);
});

module.exports = db;