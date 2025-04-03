const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getRandomQuote,
  getLastQuotes,
  addQuote,
  getUserQuotes,
  getLikedQuotes,
  getPopularQuotes,
  searchQuotes,
} = require('../controllers/quotesController');

router.get('/random', getRandomQuote);
router.get('/last-quotes', getLastQuotes);
router.post('/add-quote', authMiddleware, addQuote);
router.get('/user-quotes/:username', authMiddleware, getUserQuotes);
router.get('/liked-quotes/:username', authMiddleware, getLikedQuotes);
router.get('/popular', getPopularQuotes);
router.get('/search', searchQuotes);

module.exports = router;
