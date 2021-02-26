const { Router } = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email not in proper format').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ],
  authController.login
);

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email not in proper format').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ],
  authController.register
);

module.exports = router;
