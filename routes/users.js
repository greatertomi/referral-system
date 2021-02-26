const { Router } = require('express');

const userController = require('../controllers/users');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getOneUser);

router.put('/newReferralCode', auth, userController.createReferralCode);

router.put('/referralCode', auth, userController.updateReferralCode);

module.exports = router;
