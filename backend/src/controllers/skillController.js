/**
 * Skill Controller: CRUD operations for technical skills and proficiency levels
 */

const db = require('../config/database');

/**
 * Retrieves all technical skills categorized by domain (Frontend, Backend, Database, Tools, etc.)
 */
exports.getSkills = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, level DESC');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

/**
 * Creates a new skill entry with category name, proficiency level percentage, and icon name
 */
exports.createSkill = async (req, res, next) => {
  try {
    const { name, category, level, icon } = req.body;
    const [result] = await db.query(
      'INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)',
      [name, category, level || 80, icon || 'Code']
    );
    res.status(201).json({ success: true, message: 'Skill created.', id: result.insertId });
  } catch (err) { next(err); }
};

/**
 * Updates an existing skill's name, category, proficiency level, or icon
 */
exports.updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, level, icon } = req.body;
    await db.query(
      'UPDATE skills SET name = ?, category = ?, level = ?, icon = ? WHERE id = ?',
      [name, category, level, icon, id]
    );
    res.json({ success: true, message: 'Skill updated.' });
  } catch (err) { next(err); }
};

/**
 * Deletes a skill record from the database by ID
 */
exports.deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM skills WHERE id = ?', [id]);
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (err) { next(err); }
};
