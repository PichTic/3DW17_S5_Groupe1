'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CacheSchema = new Schema({
  gameId: {
    type: String,
    required: 'coucou'
  }
});

module.exports = mongoose.model('Cache', CacheSchema);