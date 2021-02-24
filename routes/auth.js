const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.get('/login', authController.login);

module.exports = router;
