/**
 * Education Routes: Endpoints for academic history (/api/education)
 */

const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', educationController.getEducation);
router.post('/', authMiddleware, educationController.createEducation);
router.put('/:id', authMiddleware, educationController.updateEducation);
router.delete('/:id', authMiddleware, educationController.deleteEducation);
module.exports = router;
