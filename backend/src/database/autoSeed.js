/**
 * Auto-Seeder: Automatically verifies and populates DB inside backend for Railway production
 */

const db = require('./index');
const seedData = require('./seedData');

async function autoSeed() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM profile');
    const count = rows[0]?.count || rows[0]?.['COUNT(*)'] || 0;
    
    if (count === 0) {
      console.log('[Auto-Seeder]: Database empty. Running seedData()...');
      await seedData();
    } else {
      console.log('[Auto-Seeder]: Database profile present with ' + count + ' records.');
    }
  } catch (e) {
    console.log('[Auto-Seeder]: Table missing. Initializing DB & seeding...');
    await seedData();
  }
}

module.exports = autoSeed;
