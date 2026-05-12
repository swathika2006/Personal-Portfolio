// ============================================
// Project Model — Portfolio projects
// ============================================
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'fullstack', 'mobile', 'ai/ml', 'other'],
      default: 'fullstack',
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    image: {
      type: String,
      default: 'default-project.png',
    },
    screenshots: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

module.exports = mongoose.model('Project', projectSchema);
