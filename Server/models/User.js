const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  likedQuotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }],
  countQuote: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  logo: String,
});

module.exports = model('User', User);
