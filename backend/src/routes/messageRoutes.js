/**
 * Message Routes: Endpoints for contact form & inbox (/api/messages)
 */

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', messageController.createMessage);
router.get('/', authMiddleware, messageController.getMessages);
router.put('/:id/read', authMiddleware, messageController.markAsRead);
router.put('/:id/unread', authMiddleware, messageController.markAsUnread);
router.delete('/:id', authMiddleware, messageController.deleteMessage);
module.exports = router;
