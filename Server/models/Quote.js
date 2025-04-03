const mongoose = require('mongoose');

const quoteShema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  likeBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Quote', quoteShema);
