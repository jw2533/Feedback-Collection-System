/**
Use of Passport:
1. when user click "Login", do some opreation, get user's profile from Google

2. callback function decide if create a new model instance with Mongoose(a record
 in MongoDB), and return that instance

3. make a unique identificaiton for the returned instaces by extract the id 
created by Mongo, insert that identification to cookie

4.when get another request from browser, get the identification out of cookie data,
use the identification get current user in Mongo

*/


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pull a model out of Mongoose, use single argument
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the identification information to identify the user
                       // this id is the id generated by Mongo
});

passport.deserializeUser((id, done) => {
  // a query
  User.findById(id).then(user => { // then is a promise, because access mongoDB is an asynchronous opreation
    done(null, user);
  });
});
// tell passport how to use specific Google OAuth20
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',  //this is for where the users are redirected to after they grant permissions
      proxy: true
    },
    // callback function, process all information we got from google after trading with code
    // access token : certificate to tell google we already got permission to these info
    // refresh token: refresh access token after the old one expired
    async (accessToken, refreshToken, profile, done) => {
      // findOne--a query, find the first record inside the collection
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // done function
        // 1st argument means error identification
        // 2nd argument means the instance
        return done(null, existingUser);
      }
      // create a new instace of that model class and save it to database
      // every time we access to MongoDB, it is an asynchronous opreation
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
