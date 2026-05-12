// ============================================
// Testimonial Controller — CRUD for testimonials
// ============================================
const Testimonial = require('../models/Testimonial');

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials
 * @access  Public
 */
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/testimonials
 * @desc    Add a new testimonial
 * @access  Private (Admin)
 */
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/testimonials/:id
 * @desc    Delete a testimonial
 * @access  Private (Admin)
 */
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestimonials, createTestimonial, deleteTestimonial };
