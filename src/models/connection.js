const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    socketID: String,
    userID: String
  });

  module.exports = mongoose.model('Connection', connectionSchema);
