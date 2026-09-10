/**
 * Setting Controller: Manages global website configurations
 */

const db = require('../config/database');

exports.getSettings = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM settings');
    const settingsMap = {};
    rows.forEach(r => { settingsMap[r.setting_key] = r.setting_value; });
    res.json({ success: true, data: settingsMap });
  } catch (err) { next(err); }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await db.query(
        'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, String(value), String(value)]
      );
    }
    res.json({ success: true, message: 'Settings saved.' });
  } catch (err) { next(err); }
};
