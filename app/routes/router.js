var express = require('express');

// grab the hairstyle model
var Hair = require('../models/js/db');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    var router = express.Router();

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Router is working.');
        //  go to the next routes and don't stop here
        next();
    });

    // route to handle creating goes here (app.post)
    router.route('/hairstyles')

    .post(function(req, res) {

        var hairStyle = new Hair(); 
        // create a new instance of the HairStyle model

        hairStyle.name = req.body.name;
        hairStyle.image = req.body.img;
        hairStyle.details = req.body.hairDetails;
        hairStyle.date = Date.now();
        hairStyle.saloonList = {
            saloonName: req.body.saloonName,
            saloonAddress: req.body.saloonAddress
        };
        hairStyle.meta = {
            Likes: req.body.likes,
            Dislikes: req.body.dislikes
        };
        hairStyle.comments = {
            user: User.username,
            commentText: req.body.commentText,
            date: Date.now()
        };

        // save the hairstyle details and check for errors
        hairStyle.save(function(err) {
            if (err)
                res.send(err);

            console.log('hairstyle details saved!');
        });

    });

    router.route('/hairstyles')
        .get(function(req, res) {
            // use mongoose to get all hairstyles in the database
            Hair.find(function(err, hairstyles) {

                // if there is an error retrieving, send the error. 

                if (err)
                    res.send(err);

                res.json(hairstyles); // return all hairstyles in JSON format
            });
        });


    //working on specific hairstyles
    router.route('/hairstyles/:hairstyle_id')

    // get a specific hairstyle details 
    .get(function(req, res) {
        Hair.findById(req.params.hairstyle_id, function(err, hairstyle) {
            if (err)
                res.send(err);
            res.json(hairstyle);
        });
    });

    //edit details of a haistyle
    router.route('/hairstyles/:hairstyle_id')

    .put(function(req, res) {

        // use our Hair model to find the hairstyle we want
        Hair.findById(req.params.hairstyle_id, function(err, hairstyle) {

            if (err)
                res.send(err);

            hairstyle.name = req.body.name;
            hairstyle.image = req.body.img;
            hairstyle.details = req.body.hairDetails;
            hairstyle.date = Date.now();
            hairstyle.saloonList = {
                saloonName: req.body.saloonName,
                saloonAddress: req.body.saloonAddress
            };

            // save the bear
            hairStyle.save(function(err) {
                if (err)
                    res.send(err);

                console.log('hairstyle Updated!');
            });

        });
    });

    router.route('/hairstyles/:hairstyle_id')
        // route to handle delete 

    .delete(function(req, res) {
        Hair.remove({
            _id: req.params.hairstyle_id
        }, function(err, hairstyle) {
            if (err)
                res.send(err);

            console.log('Hairstyle Successfully deleted');
        });
    });

    //use /api to handle all requests
    app.use('/', router);

};
