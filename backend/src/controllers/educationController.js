/**
 * Education Controller: CRUD operations for academic history
 */

const db = require('../config/database');

exports.getEducation = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM education ORDER BY start_date DESC');
    res.json({ success: true, data: rows.map(r => ({ ...r, is_current: Boolean(r.is_current) })) });
  } catch (err) { next(err); }
};

exports.createEducation = async (req, res, next) => {
  try {
    const { institution, degree, field, start_date, end_date, is_current, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO education (institution, degree, field, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [institution, degree, field, start_date, end_date || 'Present', is_current ? 1 : 0, description || '']
    );
    res.status(201).json({ success: true, message: 'Education record added.', id: result.insertId });
  } catch (err) { next(err); }
};

exports.updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { institution, degree, field, start_date, end_date, is_current, description } = req.body;
    await db.query(
      'UPDATE education SET institution = ?, degree = ?, field = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ?',
      [institution, degree, field, start_date, end_date, is_current ? 1 : 0, description, id]
    );
    res.json({ success: true, message: 'Education updated.' });
  } catch (err) { next(err); }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM education WHERE id = ?', [id]);
    res.json({ success: true, message: 'Education record deleted.' });
  } catch (err) { next(err); }
};
