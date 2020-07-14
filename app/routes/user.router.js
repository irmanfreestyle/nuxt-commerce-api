const express = require('express')
const router = express.Router();
const { userController } = require('../controllers');
const checkAuth = require('../middlewere/verifyAuth.js');

router.get('/:uid', checkAuth, userController.loadProfile);

module.exports = router;
