/**

User.js is used to create a model class in Mongoose called users,
which also represents a colletion in Mongo DB.

It also describe the properties of collection User

*/

const mongoose = require('mongoose');
// line 3 is eauql to :
// const Schema = mongoose.Schema
// this means the mongoose project has a property called schema
// take that property and assign it to a new variable also called Schema
// { } is a kind of destructering
const { Schema } = mongoose;

// schema describes every property for this model
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// first argument: name of the collection
// second argument: the schema we want
// two argument means load schema to model
mongoose.model('users', userSchema);
