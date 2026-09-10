/**
 * MySQL Connection Pool: Initializes MySQL database connections
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const createMysqlPool = () => {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shazid_portfolio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 2000
  });
};

module.exports = { createMysqlPool };
