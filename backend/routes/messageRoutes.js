// ============================================
// Message Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  toggleRead,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const { messageValidator } = require('../validators/messageValidator');

// POST /api/messages — Send contact message (public)
router.post('/', messageValidator, sendMessage);

// GET /api/messages — Get all messages (admin only)
router.get('/', protect, getMessages);

// PUT /api/messages/:id/read — Toggle read status (admin only)
router.put('/:id/read', protect, toggleRead);

// DELETE /api/messages/:id — Delete message (admin only)
router.delete('/:id', protect, deleteMessage);

module.exports = router;
