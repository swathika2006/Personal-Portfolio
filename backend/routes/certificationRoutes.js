// ============================================
// Certification Routes
// ============================================
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getCertifications,
  createCertification,
  deleteCertification,
} = require('../controllers/certificationController');
const { protect } = require('../middleware/auth');

const certValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('category')
    .trim()
    .notEmpty()
    .isIn(['frontend', 'backend', 'ai-ds', 'core-cs', 'professional'])
    .withMessage('Invalid category'),
  body('fileName').trim().notEmpty().withMessage('File name is required'),
];

// GET /api/certifications — Public
router.get('/', getCertifications);

// POST /api/certifications — Admin only
router.post('/', protect, certValidator, createCertification);

// DELETE /api/certifications/:id — Admin only
router.delete('/:id', protect, deleteCertification);

module.exports = router;
