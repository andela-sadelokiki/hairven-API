var Db = require('mongodb').Db;
var mongoose = require('mongoose');
var database = require('./database.js')

// grab the mongoose module

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting:'));
db.once('open', function(callback) {
    console.log('connected!');

});


//schema for hairstyles

var hairStyle = new mongoose.Schema({
    name: String,
    image: String,
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

// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);

mongoose.connect(database.url);
