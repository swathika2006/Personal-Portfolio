// ============================================
// Skill Model — Developer skills
// ============================================
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'database', 'tools'],
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency level is required'],
      min: [0, 'Proficiency must be at least 0'],
      max: [100, 'Proficiency cannot exceed 100'],
    },
    icon: {
      type: String,
      default: 'FaCode', // React Icons name
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
