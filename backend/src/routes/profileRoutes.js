/**
 * Profile Routes: Endpoints for fetching/updating personal details (/api/profile)
 */

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
module.exports = router;
