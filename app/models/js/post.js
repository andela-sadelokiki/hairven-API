// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema()

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
    comments: {
        user: String commentText: String,
        date: Date
    },
    meta: {
        Likes: Number,
        Dislikes: Number
    }

})

// pass this to other files when modules.export is called.
module.exports = mongoose.model('hair', hairStyle
});
