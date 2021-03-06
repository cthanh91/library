var express = require('express');
var router = express.Router();
const user = require('../controller/user');
const authentication = require('../controller/authentication');
const authorization = require('../middleware/authorization');

router.post('/user', user.createUser);

router.post('/login', authentication.login);

router.get('/identity',
  authorization,
  authentication.checkIdentity
);

module.exports = router;
