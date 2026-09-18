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
      if (value !== undefined && value !== null) {
        const valStr = String(value);
        const [result] = await db.query(
          'UPDATE settings SET setting_value = ? WHERE setting_key = ?',
          [valStr, key]
        );
        const affected = (result && (result.affectedRows !== undefined ? result.affectedRows : result.changes)) || 0;
        if (affected === 0) {
          await db.query(
            'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)',
            [key, valStr]
          );
        }
      }
    }
    res.json({ success: true, message: 'Settings saved successfully.' });
  } catch (err) { next(err); }
};
