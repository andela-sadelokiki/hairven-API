var Db = require('mongodb').Db;
var mongoose = require('mongoose');

// grab the mongoose module

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting:'));
db.once('open', function(callback) {
    console.log('connected!');

    var Schema = mongoose.Schema;

    //schema for hairstyles

    var hairStyle = new Schema({
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

    //schema for users

    var userDetail = new Schema({
        userName: String,
        userEmail: String,
        userPassword: String,
        userAuth: Boolean,
    })

    // The models for Hairstyles and users.
   var Hair = mongoose.model('Hair', hairStyle);

   var Users = mongoose.model('Users', userDetail);

   exports.Hair = Hair;
   exports.Users = Users;

});

mongoose.connect('ds047722.mongolab.com:47722/hairven-u<bisoye>-p<sampledata>');
