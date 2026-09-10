/**
 * Profile Controller: Handles fetching and updating user bio and profile stats
 */

const db = require('../config/database');

/**
 * Fetches personal profile information (name, title, bio, profile_image URL, social links, stats)
 */
exports.getProfile = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM profile WHERE id = 1');
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Profile not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
};

/**
 * Updates personal profile details including profile picture URL, bio description, and counter statistics
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, title, bio, email, location, github, linkedin, profile_image, projects_count, technologies_count, years_learning, achievements_count } = req.body;
    await db.query(
      `UPDATE profile SET 
        name = ?, title = ?, bio = ?, email = ?, location = ?, github = ?, linkedin = ?, profile_image = ?,
        projects_count = ?, technologies_count = ?, years_learning = ?, achievements_count = ?
       WHERE id = 1`,
      [name, title, bio, email, location, github, linkedin, profile_image, projects_count || 0, technologies_count || 0, years_learning || 0, achievements_count || 0]
    );
    const [rows] = await db.query('SELECT * FROM profile WHERE id = 1');
    res.json({ success: true, message: 'Profile updated successfully.', data: rows[0] });
  } catch (err) { next(err); }
};
