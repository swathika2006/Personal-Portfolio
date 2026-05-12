// ============================================
// Auth Routes
// ============================================
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidator, loginValidator } = require('../validators/authValidator');

// POST /api/auth/register — Register admin user
router.post('/register', registerValidator, register);

// POST /api/auth/login — Login and get JWT
router.post('/login', loginValidator, login);

// GET /api/auth/me — Get current user (protected)
router.get('/me', protect, getMe);

module.exports = router;
