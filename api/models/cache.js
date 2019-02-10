'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CacheSchema = new Schema({
  gameId: {
    type: String,
    required: 'Identifiant obligatoire'
  },
  Content: {
    type: String,
    required: 'Contenu obligatoire'
  },
  Type: {
    type: String,
    required: 'Le type est obligatoire'
  }
});

module.exports = mongoose.model('Cache', CacheSchema);