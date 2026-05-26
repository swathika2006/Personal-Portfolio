// ============================================
// Certification Model
// ============================================
const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certification title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
      maxlength: [80, 'Issuer cannot exceed 80 characters'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'ai-ds', 'core-cs', 'professional'],
    },
    // fileName points to a file in frontend/public/certificates/
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
