/**
 * Achievement Controller: CRUD operations for awards and certifications
 */

const db = require('../config/database');

exports.getAchievements = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM achievements ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

exports.createAchievement = async (req, res, next) => {
  try {
    const { title, description, image, achievement_date, external_url } = req.body;
    const [result] = await db.query(
      'INSERT INTO achievements (title, description, image, achievement_date, external_url) VALUES (?, ?, ?, ?, ?)',
      [title, description, image || '', achievement_date || '', external_url || '']
    );
    res.status(201).json({ success: true, message: 'Achievement added.', id: result.insertId });
  } catch (err) { next(err); }
};

exports.updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, achievement_date, external_url } = req.body;
    await db.query(
      'UPDATE achievements SET title = ?, description = ?, image = ?, achievement_date = ?, external_url = ? WHERE id = ?',
      [title, description, image, achievement_date, external_url, id]
    );
    res.json({ success: true, message: 'Achievement updated.' });
  } catch (err) { next(err); }
};

exports.deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM achievements WHERE id = ?', [id]);
    res.json({ success: true, message: 'Achievement deleted.' });
  } catch (err) { next(err); }
};
