'use strict';


var mongoose = require('mongoose'),
  Review = mongoose.model('Reviews'),
  Cache = mongoose.model('Cache');

exports.find_review = function(req, res) {
  Review.find({gameId: req.params.gameId}, function(err, review) {
    if (err)
      res.send("Une erreur s'est produite lors de la récupération des données");
    res.json(review);
  });
};

exports.find_all_user_reviews = function(req, res) {
  Review.find({userId: req.params.userId}, function(err, review) {
    if (err)
    {
      res.send("Une erreur s'est produite lors de la récupération des données");
    }
    res.json(review);
  });
};

exports.create_a_review = function(req, res) {
  const conditions = {
    userId: req.params.userId,
    gameId: req.params.gameId,
  }
  const options = {
    new: true,
    upsert: true,
  }
  Review.findOneAndUpdate(conditions, req.body, options, function(err, review) {
    if (err)
      res.send("Une erreur s'est produite lors de la création de la review");
    res.json(review);
  });
};

exports.update_a_review = function(req, res) {
  Review.findOneAndUpdate({userId: req.params.userId}, req.body, {new: true}, function(err, review) {
    if (err)
      res.send("Une erreur s'est produite lors de la mise à jour de la review");
    res.json(review);
  });
};


exports.delete_a_review = function(req, res) {
  Review.remove({
    userId: req.params.userId,
    gameId: req.params.gameId
  }, function(err, review) {
    if (err)
      res.send("Une erreur s'est produite lors de la suppression de la review");
    res.json({ message: 'review successfully deleted' });
  });
};