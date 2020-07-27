const express = require('express')
const router = express.Router();
const { postController } = require('../controllers');
const checkAuth = require('../middlewere/verifyAuth.js');

router.post('/', checkAuth, postController.create);
router.post('/like', checkAuth, postController.like);

router.get('/', postController.load);
router.get('/:postid', postController.findOne);

module.exports = router;
