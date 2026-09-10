/**
 * Auth Controller: Admin login and JWT token validation logic
 */

const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Handles admin sign-in with email and password, returning JWT bearer token upon verification
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, username: admin.username },
      process.env.JWT_SECRET || 'super_secret_jwt_key_shazid_2026_portfolio',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, username: admin.username, email: admin.email }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Validates active JWT token and returns current authenticated admin details
 */
exports.getMe = async (req, res, next) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (err) {
    next(err);
  }
};

/**
 * Handles admin logout response
 */
exports.logout = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * Handles changing admin password with bcrypt hashing
 */
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide current and new passwords.' });
    }

    const adminId = req.admin.id;
    const [rows] = await db.query('SELECT * FROM admins WHERE id = ?', [adminId]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Admin account not found.' });

    const admin = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE admins SET password = ? WHERE id = ?', [hashedPassword, adminId]);

    res.json({ success: true, message: 'Admin password updated successfully!' });
  } catch (err) {
    next(err);
  }
};
