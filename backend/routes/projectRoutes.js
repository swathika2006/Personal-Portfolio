// ============================================
// Project Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { projectValidator } = require('../validators/projectValidator');

// GET /api/projects — Get all projects (public)
router.get('/', getProjects);

// GET /api/projects/:id — Get single project (public)
router.get('/:id', getProject);

// POST /api/projects — Create project (admin only)
router.post('/', protect, upload.single('image'), projectValidator, createProject);

// PUT /api/projects/:id — Update project (admin only)
router.put('/:id', protect, upload.single('image'), updateProject);

// DELETE /api/projects/:id — Delete project (admin only)
router.delete('/:id', protect, deleteProject);

module.exports = router;
