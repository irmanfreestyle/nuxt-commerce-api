const express = require('express')
const router = express.Router();
const { authController } = require('../controllers');
const checkAuth = require('../middlewere/verifyAuth.js');

router.get('/me', checkAuth, authController.me);
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

module.exports = router;
