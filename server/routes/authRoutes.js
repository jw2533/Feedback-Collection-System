const passport = require('passport');

module.exports = app => {
  // this handler is to get user's code from google
  app.get(
    '/auth/google',
    passport.authenticate('google', { // string 'google' is an internal identification by GoogleStrategy
      scope: ['profile', 'email']  // what we ask from Google
    })
  );

  // this handler is to trader users' profile with the code we recived from google
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
