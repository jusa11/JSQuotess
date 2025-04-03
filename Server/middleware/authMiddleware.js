const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.error('Токен отсутствует');
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    const decodeData = jwt.verify(token, secret);
    req.user = decodeData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Пользователь не авторизован' });
  }
};
