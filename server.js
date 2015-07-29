
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('./config/express');
var port = process.env.PORT || 8080;

// start app ===============================================
// startup app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log(port + ' up and running');

// expose app           
exports = module.exports = app;
