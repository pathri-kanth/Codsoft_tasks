const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, requirementType, message } = req.body;

    // ---- Validation ----
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email is required.' });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      requirementType: requirementType || 'PROJECT',
      message: (message || '').trim()
    });

    await contact.save();

    return res.status(200).json({
      success: true,
      message: 'Thanks! Your message has been received.'
    });
  } catch (err) {
    console.error('Error saving contact submission:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.'
    });
  }
});

module.exports = router;
