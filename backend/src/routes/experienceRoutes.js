/**
 * Experience Routes: Endpoints for work experience (/api/experience)
 */

const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', experienceController.getExperience);
router.post('/', authMiddleware, experienceController.createExperience);
router.put('/:id', authMiddleware, experienceController.updateExperience);
router.delete('/:id', authMiddleware, experienceController.deleteExperience);
module.exports = router;
