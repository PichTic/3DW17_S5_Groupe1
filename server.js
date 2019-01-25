var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Review = require('./api/models/reviewModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Reviewdb');



var routes = require('./api/routes/reviewRoutes'); //importing route
routes(app); //register the route

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);

  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(404).send({url: req.originalUrl + ' not found'})
  next();
});


app.listen(port);


console.log('Review RESTful API server started on: ' + port);