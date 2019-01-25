'use strict';


exports.find_game_by_id = function (req, res) {
  const igdb = require('igdb-api-node').default;
  const client = igdb('58a2e35521ffe630ea86d44d7e85ac00');
  console.log(req.params)
  return client.games({
    fields: '*',
    ids: [req.params.gameId]
  }).then(igdbResponse => {
    res.send(igdbResponse.body[0]);
  }).catch(error => {
    throw error;
  });
};

exports.find_Game_By_Key_Word = function(req, res) {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.params.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  });
};