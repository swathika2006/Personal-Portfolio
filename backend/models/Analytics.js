// ============================================
// Analytics Model — Tracks total portfolio views
// ============================================
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    default: 'portfolio_views'
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
