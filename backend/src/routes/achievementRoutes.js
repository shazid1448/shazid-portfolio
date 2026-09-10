/**
 * Achievement Routes: Endpoints for achievements (/api/achievements)
 */

const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', achievementController.getAchievements);
router.post('/', authMiddleware, achievementController.createAchievement);
router.put('/:id', authMiddleware, achievementController.updateAchievement);
router.delete('/:id', authMiddleware, achievementController.deleteAchievement);
module.exports = router;
