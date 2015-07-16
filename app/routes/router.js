var express = require('express');

// server routes ===========================================================
var router = express.Router();

var mongoose = require('mongoose');
// grab the hairstyle model
var Hair = require('../models/db');



// middleware to use for all requests

    router.use(function(req, res, next) {
        // do logging
        console.log('Router is working.');
        //  go to the next routes and don't stop here
        next();
    });

    // route to handle creating

    router.post('/', function(req, res) {

        // create a new instance of the HairStyle model
        Hair.create(req.body, function(err) {
            if (err)
                res.send(err);
            console.log('hairstyle details saved!');
        });
    });

    //get hairstyles in database
    router.get('/', function(req, res) {
        // use mongoose to get all hairstyles in the database
        Hair.find(function(err, hairstyles) {

            // if there is an error retrieving, send the error. 
            if (err)
                res.send(err);
            // return all hairstyles in JSON format
            res.json(hairstyles);
        });
    });


    //working on specific hairstyles
    // get a specific hairstyle details 
    router.get('/:id', function(req, res) {
        Hair.findById(req.params.id, function(err, hairstyle) {
            if (err)
                res.send(err);
            res.json(hairstyle);
        });
    });

    //edit details of a haistyle

    router.put('/:id', function(req, res) {

        // use the Hair model to find the hairstyle we want
        Hair.findByIdAndUpdate(req.params.id, req.body, function(err, hairstyle) {

            if (err)
                res.send(err);
            res.json(hairstyle)
        });
    });

    // route to handle delete 

    router.delete('/:id', function(req, res) {
        Hair.FindByIDAnDRemovereq.params.id, req.body,
            function(err, hairstyle) {

                if (err)
                    res.send(err);
                res, json(hairstyle)
                console.log('Hairstyle Successfully deleted');
            };
    });


module.exports = router;
