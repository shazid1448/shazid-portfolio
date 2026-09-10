/**
 * Experience Controller: CRUD operations for work & internship experience
 */

const db = require('../config/database');

exports.getExperience = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM experience ORDER BY start_date DESC');
    res.json({ success: true, data: rows.map(r => ({ ...r, is_current: Boolean(r.is_current) })) });
  } catch (err) { next(err); }
};

exports.createExperience = async (req, res, next) => {
  try {
    const { position, company, location, start_date, end_date, is_current, description, technologies } = req.body;
    const [result] = await db.query(
      'INSERT INTO experience (position, company, location, start_date, end_date, is_current, description, technologies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [position, company, location || '', start_date, end_date || 'Present', is_current ? 1 : 0, description || '', technologies || '']
    );
    res.status(201).json({ success: true, message: 'Experience record added.', id: result.insertId });
  } catch (err) { next(err); }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { position, company, location, start_date, end_date, is_current, description, technologies } = req.body;
    await db.query(
      'UPDATE experience SET position = ?, company = ?, location = ?, start_date = ?, end_date = ?, is_current = ?, description = ?, technologies = ? WHERE id = ?',
      [position, company, location, start_date, end_date, is_current ? 1 : 0, description, technologies, id]
    );
    res.json({ success: true, message: 'Experience record updated.' });
  } catch (err) { next(err); }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM experience WHERE id = ?', [id]);
    res.json({ success: true, message: 'Experience record deleted.' });
  } catch (err) { next(err); }
};
