// keys.js - figure out what set of credentials to return
// if the app is deployed on Heroke,process.env.NODE_ENV would be automatically
// set to production
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  //module.exports: to export code and make it available to other files inside the app
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  // pull the key set in ./dev and export it
  module.exports = require('./dev');
}