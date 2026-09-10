/**
 * Skill Routes: Endpoints for technical skills (/api/skills)
 */

const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', skillController.getSkills);
router.post('/', authMiddleware, skillController.createSkill);
router.put('/:id', authMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillController.deleteSkill);
module.exports = router;
