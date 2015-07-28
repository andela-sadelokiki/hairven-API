var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');
// server routes ===========================================================
var photoRoute = express.Router();


// multer directory for photo saving
var upload = multer({
  dest: './uploads/'
});

var phUpload = upload.single('hairPhoto');

//cloudinary API details for Image upload.    
cloudinary.config({
  cloud_name: 'dabdvstcm',
  api_key: '698755435318455',
  api_secret: 'u8rgw6cy82gs6beY6Bo8EZvmJHs'
});


photoRoute.use(function(req, res, next) {
  // do logging
  console.log('photoRoute is working.');
  //  go to the next routes and don't stop here
  next();
});

photoRoute.post('/', function(req, res) {
  phUpload(req, res, function(err) {
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, function(result) {
        if (result.url) {
          req.imageLink = result.url;
          next();
        } else {
          res.json(error);
        }
      });
    } else {
      next();
    }
  });
  console.log("photo uploaded");
});


photoRoute.get('/', function(req, res, next) {
  cloudinary.api.resources(function(items) {
    res.sendFile('index.html', {
      "root": './view'
    }, {
      images: items.resources,
      cloudinary: cloudinary
    });
  });
});

module.exports = photoRoute;
