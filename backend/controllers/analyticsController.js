// ============================================
// Analytics Controller
// ============================================
const Analytics = require('../models/Analytics');

// @route   GET /api/analytics/views
// @desc    Get total views
// @access  Public
const getViews = async (req, res, next) => {
  try {
    let analytics = await Analytics.findOne({ type: 'portfolio_views' });
    if (!analytics) {
      analytics = await Analytics.create({ type: 'portfolio_views', count: 0 });
    }
    res.status(200).json({ success: true, views: analytics.count });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/analytics/views
// @desc    Increment view count
// @access  Public
const incrementViews = async (req, res, next) => {
  try {
    const analytics = await Analytics.findOneAndUpdate(
      { type: 'portfolio_views' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, views: analytics.count });
  } catch (error) {
    next(error);
  }
};

module.exports = { getViews, incrementViews };
