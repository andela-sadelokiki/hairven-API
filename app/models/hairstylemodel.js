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
    name: String,
    details: String,
    date: {
        type: Date,
        default: Date.now()
    },
    saloonList: {
        saloonName: String,
        saloonAddress: String
    },
    meta: {
        Likes: Number,
        Dislikes: Number
    },
    comments: {
        user: String,
        commentText: String,
        date: Date
    }

});

var hairImage = new mongoose.Schema({

    title: {
        type: String,
        size: 255
    },
    image: {
        type: JSON
    }

});
// The models for Hairstyles and Photo.
module.exports = mongoose.model('Hair', hairStyle);
module.exports = mongoose.model('Photo', hairImage);

mongoose.connect(database.url);
