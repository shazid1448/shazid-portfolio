/**
 * Auto-Seeder: Automatically verifies and populates DB on production server boot if empty
 */

const path = require('path');
const db = require('./index');

async function autoSeed() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM profile');
    const count = rows[0]?.count || rows[0]?.['COUNT(*)'] || 0;
    
    if (count === 0) {
      console.log('[Auto-Seeder]: Database is empty on production. Running seed script...');
      const seedScriptPath = path.join(__dirname, '../../../database/seed.js');
      delete require.cache[require.resolve(seedScriptPath)];
      require(seedScriptPath);
    } else {
      console.log('[Auto-Seeder]: Database already populated with profile data.');
    }
  } catch (e) {
    console.log('[Auto-Seeder]: Initializing DB schema and seeding on boot...');
    try {
      const seedScriptPath = path.join(__dirname, '../../../database/seed.js');
      require(seedScriptPath);
    } catch(err) {
      console.error('[Auto-Seeder] Error:', err.message);
    }
  }
}

module.exports = autoSeed;
