const { check } = require('express-validator');
const express = require('express');
const router = express.Router();
const { authController, upload } = require('../controllers/authController');

router.post(
  '/registration',
  upload.single('logo'),
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть от 4 до 10 символов').isLength({
      min: 4,
      max: 10,
    }),
  ],

  authController.registration
);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;
