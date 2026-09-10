/**
 * SQLite Database Engine: Manages SQLite fallback query executions and transactions
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../database/shazid_portfolio.sqlite');

let sqliteDb = null;

const getSqliteInstance = () => {
  if (!sqliteDb) {
    sqliteDb = new sqlite3.Database(dbPath);
    sqliteDb.run('PRAGMA foreign_keys = ON;');
  }
  return sqliteDb;
};

const querySqlite = (sql, params = []) => {
  const db = getSqliteInstance();
  return new Promise((resolve, reject) => {
    const trimmedSql = sql.trim();

    if (/^SELECT/i.test(trimmedSql)) {
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve([rows, []]);
      });
    } else if (/^INSERT/i.test(trimmedSql)) {
      if (Array.isArray(params[0]) && Array.isArray(params[0][0])) {
        const rowsToInsert = params[0];
        const match = trimmedSql.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)/i);
        if (match) {
          const table = match[1];
          const cols = match[2].split(',').map(c => c.trim());
          const placeholders = cols.map(() => '?').join(',');
          const insertStmt = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders})`;

          db.serialize(() => {
            db.run('BEGIN TRANSACTION;');
            const stmt = db.prepare(insertStmt);
            let lastId = 0;
            rowsToInsert.forEach(row => {
              stmt.run(row, function(err) {
                if (err) console.error('Bulk row error:', err);
                lastId = this.lastID;
              });
            });
            stmt.finalize();
            db.run('COMMIT;', (err) => {
              if (err) return reject(err);
              resolve([{ insertId: lastId, affectedRows: rowsToInsert.length }, []]);
            });
          });
          return;
        }
      }

      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve([{ insertId: this.lastID, affectedRows: this.changes }, []]);
      });
    } else {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve([{ affectedRows: this.changes }, []]);
      });
    }
  });
};

module.exports = { getSqliteInstance, querySqlite };
