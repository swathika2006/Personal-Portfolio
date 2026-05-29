// ============================================
// Analytics Routes
// ============================================
const express = require('express');
const router = express.Router();
const { getViews, incrementViews } = require('../controllers/analyticsController');

// GET /api/analytics/views — Get total views
router.get('/views', getViews);

// POST /api/analytics/views — Increment views
router.post('/views', incrementViews);

module.exports = router;
