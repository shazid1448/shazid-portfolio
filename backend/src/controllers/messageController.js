/**
 * Message Controller: Handles public contact submissions and admin inbox management
 */

const db = require('../config/database');

/**
 * Submits a new visitor message from the public Contact Form into the database
 */
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const [result] = await db.query(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully!', id: result.insertId });
  } catch (err) { next(err); }
};

/**
 * Retrieves all contact messages for the admin inbox view
 */
exports.getMessages = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

/**
 * Marks a contact message as read
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);
    res.json({ success: true, message: 'Message marked as read.' });
  } catch (err) { next(err); }
};

/**
 * Marks a contact message as unread
 */
exports.markAsUnread = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE messages SET is_read = 0 WHERE id = ?', [id]);
    res.json({ success: true, message: 'Message marked as unread.' });
  } catch (err) { next(err); }
};

/**
 * Deletes a contact message record by ID
 */
exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM messages WHERE id = ?', [id]);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) { next(err); }
};
