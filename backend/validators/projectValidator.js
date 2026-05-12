// ============================================
// Project Validators
// ============================================
const { body } = require('express-validator');

const projectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 300 })
    .withMessage('Description cannot exceed 300 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'ai/ml', 'other'])
    .withMessage('Invalid category'),
  body('technologies')
    .notEmpty()
    .withMessage('At least one technology is required'),
];

module.exports = { projectValidator };
