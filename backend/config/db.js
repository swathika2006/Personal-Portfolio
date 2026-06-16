// ============================================
// MongoDB Connection Configuration
// ============================================
const mongoose = require('mongoose');
const dns = require('dns');

// Use Google Public DNS to avoid corporate/VPN DNS interference
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * Connect to MongoDB Atlas
 * Uses the MONGO_URI from environment variables
 * Retries up to 5 times with exponential backoff
 */
const connectDB = async (retries = 5) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB Connection Error (attempt ${attempt}/${retries}): ${error.message}`);
      if (attempt === retries) {
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`⏳ Retrying in ${delay / 1000}s...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
