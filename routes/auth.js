const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.get('/login', authController.login);

router.get('/users', authController.users);

module.exports = router;
