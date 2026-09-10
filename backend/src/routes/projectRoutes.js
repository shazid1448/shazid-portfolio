/**
 * Project Routes: Endpoints for portfolio projects (/api/projects)
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);
router.post('/', authMiddleware, projectController.createProject);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);
module.exports = router;
