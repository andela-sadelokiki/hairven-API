var dotenv = require('dotenv');
dotenv.load();
var cloudinary = require('cloudinary');

//check to ensure .env passes cloudinary details
if (typeof(process.env.CLOUDINARY_URL) == 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log('cloudinary config:');
  console.log(cloudinary.config());
}

var express = require('express');
var app = express();


// routes ==================================================
var router = require('../app/routes/hairstyle.routes.js');

var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var multer = require('multer');
var multer = require('multer');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var database = require('../app/models/database.js');

//require('../app/routes/users.routes.js')(app, passport);
mongoose.connect(database.url);

//multer properties for saving into file with an assigned name. 
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

app.use(multer({
  storage: storage
}).single('hairPhoto'));

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./passport')(passport); // pass passport for configuration

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({
  secret: 'i',
  resave: false,
  saveUninitialized: true
}));

// session secret
app.use(passport.initialize());
app.use(passport.session());

//route trough api
app.use('/api', router);

exports = module.exports = app;
