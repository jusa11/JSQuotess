const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const secret = process.env.JWT_SECRET;

const generateAccesToken = (id, username, logo) => {
  const payload = {
    _id: id,
    username,

    logo,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Формат файла не поддерживается	'), false);
    }
    cb(null, true);
  },
});

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `${username} не в нашей банде` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: 'Ты ввел неверный шифр, сынок' });
      }
      const token = generateAccesToken(
        user._id,
        user.username,
        user.logo
      );

      return res.json({ token });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'Это погоняло уже занято' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      

      const logoPath = req.file
        ? `/uploads/${req.file.filename}`
        : '/uploads/default-logo.png';

      const user = new User({
        username,
        password: hashPassword,
        logo: logoPath,
      });
      await user.save();
      const token = generateAccesToken(
        user._id,
        user.username,
        user.logo
      );

      return res.json({ token, message: 'Ты был зачислен в нашу банду' });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Ошибка при получении пользователей', error);
      res.status(500).json({ message: error.message });
    }
  }
}

const authController = new AuthController();

module.exports = { authController, upload };
