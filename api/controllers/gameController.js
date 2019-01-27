'use strict';
const axios = require('axios');
const api_key = "58a2e35521ffe630ea86d44d7e85ac00";
var cache = {};

exports.cache_delete = function(req, res){
  cache = {};
  res.send("Cache supprimer");
}

function cache_store(json, id) {
  try {
    cache[id] = json;
    return true;
  }
  catch(error) {
    return false;
  }
  
}

function cache_retrieve(id){
  if (cache[id] != null) {
    return cache[id];
  }
  else {
    return false;
  }

}

exports.find_game_by_id = function (req, res) {
  var result = cache_retrieve(req.params.gameId);
  if (result !== false) {
    res.json(result);
  } else {
  axios.get("https://api-v3.igdb.com/games/" + req.params.gameId + "?fields=*", {
    headers: {
      "user-key": api_key,
      Accept: "application/json"
    }
  })
  .then(response => {
    res.json(response.data);
    cache_store(response.data, req.params.gameId);
    
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send("Erreur, merci de réesayer ultérieurement")
  });
  }

};

exports.find_game_by_key_word = function(req, res) {
  var result = cache_retrieve(req.params.text);
  if (result !== false) {
    res.json(result);
  } else {
    axios.get("https://api-v3.igdb.com/games/?fields=*&limit=20&offset=0&search=" + req.params.text, {
    headers: {
      "user-key": api_key,
      Accept: "application/json"
    }
  })
  .then(response => {
    res.json(response.data);
    cache_store(response.data, req.params.text);
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send("Erreur, merci de réesayer ultérieurement")
  });
  }

};