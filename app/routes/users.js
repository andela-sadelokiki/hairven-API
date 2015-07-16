var passport = require('passport');

module.exports = function(app, passport) {

    // HOME 
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // LOGIN ===========
    app.get('/login', function(req, res) {
        res.render('login.ejs'); 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login'
    }));

    // SIGNUP ===========
    app.get('/signup', function(req, res) {
        res.render('signup.ejs');
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup'
    }));

    // PROFILE SECTION ============
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user 
        });
    });

    // LOGOUT ============
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}