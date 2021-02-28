var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const authenticateController = require('../controller/authenticate');

router.post('/user', userController.createUser);
router.post('/login', authenticateController.login);
router.get('/test', authenticateController.test);

module.exports = router;
