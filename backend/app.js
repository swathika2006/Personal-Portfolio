// ============================================
// Express Application Setup
// ============================================
const express = require('express');
const cors = require('cors');
// It is cross orgin resource sharing allows connnection between two different hosts like 3000 and 5000

const helmet = require('helmet');
// Protection for middleware

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const messageRoutes = require('./routes/messageRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const certificationRoutes = require('./routes/certificationRoutes');

const app = express();

// ---- Security Middleware ----

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Helmet — secure HTTP headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});
app.use('/api/', limiter);

// ---- Body Parsing ----
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ---- Logging ----
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ---- Static Files ----
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- API Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/certifications', certificationRoutes);

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// ---- 404 Handler ----
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ---- Global Error Handler ----
app.use(errorHandler);

module.exports = app;
