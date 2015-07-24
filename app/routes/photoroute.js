var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');
// server routes ===========================================================
var photoRoute = express.Router();

var mongoose = require('mongoose');
// grab the hairstyle and photo model
var Photo = require('../models/hairstylemodel');

// multer directory for photo saving
var upload = multer({dest: './uploads/'});
var phUpload = upload.single('hairPhoto');

photoRoute.post('/profile', function (req, res) {
  phUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return (err);
    }
    	console.log("photo uploaded");
  });
});

module.exports = {

    uploadImage: function(req, res, next) {
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
    }
};

photoRoute.post('/uploads', function(req, res) {
    var newPhoto = fs.createReadStream(req.file, {
            encoding: 'binary'
        }),
        stream = cloudinary.uploader.upload_stream(function() {
            res.redirect('/');
        });

    imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
});

photoRoute.get('/', function(req, res, next) {
    cloudinary.api.resources(function(items) {
        res.senfFile('/', {
            images: items.resources,
            cloudinary: cloudinary
        });
    });
});

module.exports = photoRoute;
