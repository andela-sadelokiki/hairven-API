var mongoose = require('mongoose');

var cloudinary = require('cloudinary');
var fs = require('fs');

// grab the hairstyle and photo model
var Hair = require('../models/hairstylemodel');


module.exports = {

  //function for creation of hairstyle
  createHairStyle: function(req, res) {
    var photo = null;
    if (req.file) {
      // Get temp file path 
      var imageFile = req.file.path;

      //upload file to the cloudinary web-server
      cloudinary.uploader.upload(imageFile, function(response) {
        console.log('photo uploaded to Cloudinary service');
        console.dir(response);
        photo = response.url;
    
      // create a new instance of the HairStyle model
      var newHair = req.body;
      var hairStyle = new Hair(newHair);
      hairStyle.image = response.url;
      console.log(hairStyle.image);
      hairStyle.save(function(err, response) {
        if (err) {
          res.send(err);
        } else {
          console.log('hairstyle details saved!');
        }
      });
    }, {
        use_filename: true
      });
    }
  },

  //get hairstyles in database
  getAllHairStyles: function(req, res) {
    // use mongoose to get all hairstyles in the database
    Hair.find(function(err, hairstyles) {

      // if there is an error retrieving, send the error. 
      if (err)
        res.send(err);
      // return all hairstyles in JSON format
      res.json(hairstyles);
    });
  },

  //get a specific hairstyle
  getByName: function(req, res) {
    Hair.find({
      name: req.params.name
    }, function(err, hairstyle) {
      if (err)
        res.send(err);
      res.json(hairstyle);
    });
  },

  //edit details of a haistyle
  updateHairStyle: function(req, res) {

    // use the Hair model to find the hairstyle 
    Hair.update({
      name: req.params.name
    }, req.body, function(err, hairstyle) {

      if (err)
        res.send(err);
      res.json(hairstyle);
    });
  },

  // remove a hairstyle 
  removeHairStyle: function(req, res) {

    Hair.find({
      name: req.params.name
    }, req.body).remove(function(err, hairstyle) {

      if (err)
        res.send(err);
      res.json(hairstyle);
      console.log('Hairstyle Successfully deleted');
    });
  }

};
