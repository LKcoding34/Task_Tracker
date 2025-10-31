require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  dbPath: process.env.DATABASE_PATH || './tasks.db',
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
};