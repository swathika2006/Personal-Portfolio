// ============================================
// Testimonial Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

// GET /api/testimonials — Get all testimonials (public)
router.get('/', getTestimonials);

// POST /api/testimonials — Add testimonial (admin only)
router.post('/', protect, createTestimonial);

// DELETE /api/testimonials/:id — Delete testimonial (admin only)
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
