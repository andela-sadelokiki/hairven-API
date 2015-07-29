var mongoose = require('mongoose');

// grab the hairstyle and photo model
var Hair = require('../models/hairstylemodel');





module.exports = {

    //function for creation of hairstyle
  newHairStyle: function(req, res) {

    // create a new instance of the HairStyle model
    Hair.create(req.body, function(err) {
      if (err)
        res.send(err);
      console.log('hairstyle details saved!');
    });

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
    Hair.findById(req.params.id, function(err, hairstyle) {
      if (err)
        res.send(err);
      res.json(hairstyle);
    });
  },

  //edit details of a haistyle
  updateHairStyle: function(req, res) {

    // use the Hair model to find the hairstyle 
    Hair.findByIdAndUpdate(req.params.id, req.body, function(err, hairstyle) {

      if (err)
        res.send(err);
      res.json(hairstyle);
    });
  },

  // remove a hairstyle 
  removeHairStyle: function(req, res) {

    Hair.findByIdAndRemove(req.params.id, req.body, function(err, hairstyle) {

      if (err)
        res.send(err);
      res.json(hairstyle);
      console.log('Hairstyle Successfully deleted');
    });
  }

};
