var express = require('express');
// server routes ===========================================================
var router = express.Router();

var hairDetails = require('../controllers/hairstyle.controller');
//var hairImage = require('../controllers/photo.controller');

router.use(function(req, res, next) {
    // do logging
    console.log('Router is working.');
    //  go to the next routes and don't stop here
    next();
});

//requests on all data
router.route('/hairstyle')
.post(hairDetails.createHairStyle)
.get(hairDetails.getAllHairStyles);

//request on specific data
router.route('/hairstyle/:name')
.get(hairDetails.getByName)
.put(hairDetails.updateHairStyle)
.delete(hairDetails.removeHairStyle);

module.exports = router;