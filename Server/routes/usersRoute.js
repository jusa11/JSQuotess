const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserLevel, toggleLike } = require('../controllers/usersController');

router.post('/like/:quoteId', authMiddleware, toggleLike);
router.get('/level/:username', getUserLevel);

module.exports = router;
