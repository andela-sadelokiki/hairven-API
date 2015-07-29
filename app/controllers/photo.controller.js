var express = require('express');
var cloudinary = require('cloudinary');
var fs = require('fs');

// grab the hairstyle and photo model
var Hair = require('../models/hairstylemodel');


module.exports = {

  postPhoto: function(req, res, next) {

    if (req.file) {
      var photo = new Hair();
      // Get temp file path 
      var imageFile = req.file.path;

      //upload file to the cloudinary web-server
      cloudinary.uploader.upload(imageFile, {
          tags: 'Hairstyle Photos'
        }, function(response) {
          console.log('photo uploaded to Cloudinary service');
          console.dir(response);
          photo.image = response.url;

          // Save photo with image metadata
          return photo.save();
        });
    }
  },

};
