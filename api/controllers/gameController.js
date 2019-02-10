'use strict';
const axios = require('axios');
const api_key = "58a2e35521ffe630ea86d44d7e85ac00";
var mongoose = require('mongoose'),
  Cache = mongoose.model('Cache');
mongoose.set('debug', true);

exports.cache_delete = function(req, res){

    Cache.deleteMany({}, function(err) {
    if (err)
      console.log("ERROR DELETE");
  });
  res.send("Cache supprimer");
}

function cache_store(json, id, type) {
  try {
    const conditions = {
      gameId: id,
      Type: type,
    }
    const update = {
      Content: json,
      gameId: id,
      Type: type,
    }
    const options = {
      new: true,
      upsert: true,
    }
    Cache.findOneAndUpdate(conditions, update, options, function(err, cache) {
      if (err){
        console.log("CREATE FAIL");
      }
      
    });
    console.log("-----------DEBUG BDD OK---------------");
    return true;
  }
  catch(error) {
    console.log(error);
    return false;    
  }
  
}

async function cache_retrieve(id, type){
  try{
    var result = await Cache.findOne({gameId: id, Type: type}, 'Content',  async function (err, cache) {
    if (err){
      console.log(err);
    }
    return cache['Content'];
  });
    return result;
  }
  catch(error){
    console.log(error);   
  }

}

exports.find_game_by_id = async function (req, res) {
  var result = await cache_retrieve(req.params.gameId, "Game");
  if (result != undefined) {
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
    cache_store(response.data, req.params.gameId, "Game");
    
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send("Erreur, merci de réesayer ultérieurement")
  });
  }

};

exports.find_cover_by_id = async function (req, res) {
  var result = await cache_retrieve(req.params.gameId, "Image");
  if (result != undefined) {
    res.json(result);
  } else {
  axios.get("https://api-v3.igdb.com/covers/", {
    headers: {
      "user-key": api_key,
      Accept: "application/json"
    },
      data: "fields image_id; where game=" + req.params.gameId + ";"
  })
  .then(response => {
    res.json(response.data);
    cache_store(response.data, req.params.gameId, "Image");
    
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send(e)
  });
  }

};

exports.find_game_by_key_word = async function(req, res) {
  var result = await cache_retrieve(req.params.text, "Keyword");
  if (result != undefined) {
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
    cache_store(response.data, req.params.text, "Keyword");
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send("Erreur, merci de réesayer ultérieurement")
  });
  }

};