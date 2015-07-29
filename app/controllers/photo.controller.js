var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');

// grab the hairstyle and photo model
var hairImage = require('../models/hairstylemodel');
// multer directory for photo saving
var upload = multer({
  dest: './uploads/'
});


function addNewPhoto(req, res) {
  // Create a new photo model and set it's default title
  var photo = new hairImage();
  hairImage.count().then(function(amount) {
      photo.title = "Hairstyle #" + (amount + 1);
    })
    .finally(function() {
      res.sendFile('/', {
        photo: photo
      });
    });
}

module.exports = {

  postPhoto: function(req, res, next) {
    addNewPhoto();
    if (req.file) {

      var photo = new hairImage(req.file);
      // Get temp file path 
      var imageFile = req.file.path;

      cloudinary.uploader.upload(imageFile, {
          tags: 'Hairstyle Photos'
        })
        .then(function(file) {
          console.log('photo uploaded to Cloudinary service');
          console.dir(file);
          photo.image = file;
          // Save photo with image metadata
          return photo.save();
        })
        .then(function(photo) {
          console.log(' photo saved');
        });
    }
  },


  getPhoto: function(req, res, next) {
    cloudinary.api.resources(function(items) {
      res.sendFile('index.html', {
        "root": './view'
      }, {
        images: items.resources,
        title: 'HairStyles',
        cloudinary: cloudinary
      });
      if (err) {
        return err;
      }
    });
  }
};
