'use strict';
const axios = require('axios');

exports.find_game_by_id = function (req, res) {
  axios.get("https://api-v3.igdb.com/games/" + req.params.gameId + "?fields=*", {
    headers: {
      "user-key": "58a2e35521ffe630ea86d44d7e85ac00",
      Accept: "application/json"
    }
  })
  .then(response => {
    res.json(response.data)
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send(e)
  });
};

exports.find_Game_By_Key_Word = function(req, res) {
  axios.get("https://api-v3.igdb.com/games/?fields=*&limit=20&offset=0&search=" + req.params.text, {
    headers: {
      "user-key": "58a2e35521ffe630ea86d44d7e85ac00",
      Accept: "application/json"
    }
  })
  .then(response => {
    res.json(response.data)
  })
  // To do renvoyer les erreurs
  .catch(e => {
    res.send(e)
  });
};