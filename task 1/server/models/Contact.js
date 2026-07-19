const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  requirementType: { type: String }, // PROJECT | ROLE | COLLAB | MENTORING
  message: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
