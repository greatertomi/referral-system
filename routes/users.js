const { Router } = require('express');

const userController = require('../controllers/users');

const router = Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getOneUser);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

module.exports = router;
