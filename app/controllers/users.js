var passport = require('passport');

module.exports = function(app, passport) {

  // Index
  app.get('/', function(req, res) {
    res.sendFile('/');
  });

  // Login
  app.get('/login', function(req, res) {
    res.sendFile('/login');
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

  // Signup
  app.get('/signup', function(req, res) {
    res.sendFile('/signup');
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }));

  // Profile
  app.get('/profile', isLoggedIn, function(req, res) {
    res.sendFile('/profile', {
      user: req.user
    });
  });

  // Facebook 
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect('/profile');
    });

  // Google
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // Logout
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
