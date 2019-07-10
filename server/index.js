/**

It is the start file of whole project

*/

//import
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // import cookie lib
const passport = require('passport');  // make passport enable cookie
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// make sure codes inside these js files be excuted
// we need to first require Users and Surveys of models before passport
// becasue passport used the two schema
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
// wired MongoDB with my server
mongoose.connect(keys.mongoURI);
// create an express object called app which use express
const app = express();

app.use(bodyParser.json());

// middlewares: used to modify incoming request to app before they are sent off to route handlers
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days, passed in as ms
    keys: [keys.cookieKey]
  })
);

// these two functions are used to tell passport to use cookie to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// require the functions in files and immediately call that function for app boject
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  // a router handler
  // first param : path 
  // second param : codes need to be excuted when a request get in this route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// dynamic port binding
// define a specific port or depends on the running environment
const PORT = process.env.PORT || 5000;
app.listen(PORT);
