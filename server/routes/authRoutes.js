/**

authRoutes handles all routes about authentication from 3rd party
include:

1. a initial authenticate route

2. a callback route after authentication

3. a route for test that can send profile of current user

4. a logout route

*/

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
    req.logout(); // logout() is a function that is automatically attached to req object by passport
                  // it kills the cookies which has id
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
