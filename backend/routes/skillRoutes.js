// ============================================
// Skill Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/auth');

// GET /api/skills — Get all skills (public)
router.get('/', getSkills);

// POST /api/skills — Add skill (admin only)
router.post('/', protect, createSkill);

// PUT /api/skills/:id — Update skill (admin only)
router.put('/:id', protect, updateSkill);

// DELETE /api/skills/:id — Delete skill (admin only)
router.delete('/:id', protect, deleteSkill);

module.exports = router;
