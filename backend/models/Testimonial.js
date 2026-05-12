// ============================================
// Testimonial Model — Client/peer testimonials
// ============================================
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [50, 'Role cannot exceed 50 characters'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [50, 'Company cannot exceed 50 characters'],
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    avatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
