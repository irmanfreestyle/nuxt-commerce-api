const express = require('express')
const router = express.Router();
const checkAuth = require('../middlewere/verifyAuth.js');
const multer = require('multer');
const path = require('path');

let upload = function(dest) {
  return multer({ dest: `${dest}`,
    onError : function(err, next) {
        console.log('error', err);
        next(err);
    },
    fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.svg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    }
  })
}

router.post('/', checkAuth, upload('public/uploads/').array('images', 10), function(req, res) {
  let photos = req.files;
  res.status(200).json({
      message: 'success uploaded files',
      data: photos
  })
})



module.exports = router;