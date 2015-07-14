var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;

var mongoose = require('mongoose');

hairstyleData = function() {
    this.db = new Db('Hairven');
    this.db.open(function() {});
};


hairstyleData.prototype.getCollection = function(callback) {
    this.db.collection('hairstyles', function(error, hairstyle_collection) {
        if (error) callback(error);
        else callback(null, hairstyle_collection);
    });
};

//find all hairstyles
hairstyleData.prototype.findAll = function(callback) {
    this.getCollection(function(error, hairstyle_collection) {
        if (error) callback(error)
        else {
            hairstyle_collection.find().toArray(function(error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};

//save new hairstyle
hairstyleData.prototype.save = function(hairstyles, callback) {
    this.getCollection(function(error, hairstyle_collection) {
        if (error) callback(error)
        else {
            if (typeof(hairstyles.length) == "undefined")
                hairstyles = [hairstyles];

            for (var i = 0; i < hairstyles.length; i++) {
                hairstyle = hairstyles[i];
                hairstyle.date_posted = new Date();
            }

            hairstyle_collection.insert(hairstyles, function() {
                callback(null, hairstyles);
            });
        }
    });
};


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
    module.exports = mongoose.model('Hair', hairStyle);

    module.exports = mongoose.model('Users', userDetail);

});


exports.hairstyleData = hairstyleData;

mongoose.connect('ds047722.mongolab.com:47722/myapp-u<realbisoye>-p<bimeemee>');