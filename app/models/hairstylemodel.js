var Db = require('mongodb').Db;
var mongoose = require('mongoose');
var database = require('./database.js');

// grab the mongoose module

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting:'));
db.once('open', function(callback) {
  console.log('connected!');

});

//schema for hairstyles

var hairStyle = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter a HairStyle name'
  },
  details: {
    type: String
  },
  image: {
    type: String,
    require: true

  },
  date: {
    type: Date,
    default: Date.now('dd/mm/yyyy')
  },
  saloonList: {
    saloonName: {
      type: String,
      require: true,
      required: "Enter your saloon's name"
    },
    saloonAddress: {
      type: String
    }
  },
  meta: {
    Likes: Number,
    Dislikes: Number
  },

});


// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);
