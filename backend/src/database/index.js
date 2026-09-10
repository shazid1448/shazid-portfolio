/**
 * Database Manager: Dual database adapter supporting MySQL with automatic SQLite fallback
 */

const { createMysqlPool } = require('./mysql');
const { querySqlite } = require('./sqlite');
require('dotenv').config();

let dbMode = 'UNKNOWN';
let mysqlPool = null;

async function getMode() {
  if (dbMode !== 'UNKNOWN') return dbMode;

  try {
    const pool = createMysqlPool();
    const conn = await pool.getConnection();
    conn.release();
    mysqlPool = pool;
    dbMode = 'MYSQL';
    console.log('[Database]: Connected to MySQL.');
    return 'MYSQL';
  } catch (err) {
    console.log('[Database]: MySQL not available. Using local SQLite database file.');
    dbMode = 'SQLITE';
    return 'SQLITE';
  }
}

async function query(sql, params = []) {
  const mode = await getMode();
  if (mode === 'MYSQL') {
    return await mysqlPool.query(sql, params);
  }
  return await querySqlite(sql, params);
}

module.exports = { query, getMode };
