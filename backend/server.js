// ============================================
// Server Entry Point
// ============================================
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB before handling any requests
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  }
  next();
});

// Local development — start Express server with app.listen()
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    isConnected = true;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running in development mode`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`❤️  Health check at http://localhost:${PORT}/api/health\n`);
    });
  }).catch((error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
}

// Vercel serverless — export the Express app
module.exports = app;
