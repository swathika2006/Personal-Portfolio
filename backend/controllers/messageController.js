// ============================================
// Message Controller — Contact form messages
// ============================================
const { validationResult } = require('express-validator');
const Message = require('../models/Message');

/**
 * @route   POST /api/messages
 * @desc    Send a contact message
 * @access  Public
 */
const sendMessage = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const message = await Message.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/messages
 * @desc    Get all messages
 * @access  Private (Admin)
 */
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/messages/:id/read
 * @desc    Mark message as read/unread
 * @access  Private (Admin)
 */
const toggleRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.read = !message.read;
    await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${message.read ? 'read' : 'unread'}`,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/messages/:id
 * @desc    Delete a message
 * @access  Private (Admin)
 */
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessages, toggleRead, deleteMessage };
