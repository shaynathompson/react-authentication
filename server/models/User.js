var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define collection for user schema
var UserSchema= new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
     type: Boolean,
     required:true,
     default: false },

  token: { 
    type: String
    , required: true },
});

module.exports = mongoose.model('User', UserSchema);