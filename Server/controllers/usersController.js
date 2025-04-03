const Quote = require('../models/Quote');
const User = require('../models/User');
const checkUserLevel = require('../utils/checkUserLevel');

// Левел пользователя
exports.getUserLevel = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const currentCountQuotes = user.countQuote; // всего циатат у пользователя

    const levelIfo = checkUserLevel(currentCountQuotes);

    res.json({ currentCountQuotes, ...levelIfo });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// лайк
exports.toggleLike = async (req, res) => {
  try {
    const { quoteId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    let quote = await Quote.findById(quoteId).populate({
      path: 'userId',
      select: 'username level logo',
    });

    if (!quote) {
      return res.status(404).json({ message: 'Цитата не найдена' });
    }

    const isLiked = user.likedQuotes.includes(quoteId);

    if (isLiked) {
      user.likedQuotes = user.likedQuotes.filter(
        (id) => id.toString() !== quoteId.toString()
      );
      quote.likeBy = quote.likeBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      quote.likes -= 1;
    } else {
      user.likedQuotes.unshift(quoteId);
      quote.likes += 1;
      quote.likeBy.push(user._id);
    }

    await user.save();
    await quote.save();

    quote = await Quote.findById(quoteId).populate({
      path: 'userId',
      select: 'username level logo',
    });
    res.json({
      success: true,
      liked: !isLiked,
      quantity: quote.likes,
      quote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
