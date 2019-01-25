'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReviewSchema = new Schema({
  gameId: {
    type: String,
    required: 'Une review doit avoir un GameId'
  },
  userId: {
    type: String,
    required: 'Une review doit avoir un UserId'
  },
  score: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Reviews', ReviewSchema);