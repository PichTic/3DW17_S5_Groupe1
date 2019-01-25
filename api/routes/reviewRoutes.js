'use strict';
module.exports = function(app) {
  var review = require('../controllers/reviewController');
  var game = require('../controllers/gameController')

  // review Routes
  app.route('/users/:userId/games/:gameId/review')
    .get(review.find_review)
    .put(review.update_a_review)
    .post(review.create_a_review)
    .delete(review.delete_a_review);

  app.route('/game/:gameId')
    .get(game.find_game_by_id);

  app.route('/search/:text')
    .get(game.find_Game_By_Key_Word);
};

