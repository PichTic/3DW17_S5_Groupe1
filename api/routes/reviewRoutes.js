'use strict';
module.exports = function(app) {
  var review = require('../controllers/reviewController');

  // review Routes
  app.route('/users/:userId/games/:gameId/review')
    .get(review.find_review)
    .put(review.update_a_review)
    .post(review.create_a_review)
    .delete(review.delete_a_review);


  app.route('/reviews/:reviewId')
    .get(review.read_a_review)
};
