// ============================================
// Certification Controller
// ============================================
const { validationResult } = require('express-validator');
const Certification = require('../models/Certification');

/**
 * @route   GET /api/certifications
 * @desc    Get all certifications
 * @access  Public
 */
const getCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: certs.length, data: certs });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/certifications
 * @desc    Add a new certification
 * @access  Private (Admin)
 */
const createCertification = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, message: 'Certification added successfully', data: cert });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/certifications/:id
 * @desc    Delete a certification
 * @access  Private (Admin)
 */
const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCertifications, createCertification, deleteCertification };
