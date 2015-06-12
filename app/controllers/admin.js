var express = require('express'),
  router = express.Router(),
  MongoPage = require('../models/mongo-page'),
  MongoHelper = require('../models/mongo-functions/mongo-helper')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/admin', function (req, res, next) {
    var response = {
      alias: "Admin",
      title: 'Stats',
      heading: 'Who\'s comming so far',
      responseList: null
    };
    MongoHelper.getResponses(function(results, err) {
      response.responseList = results;
      res.render('admin', response);
    });
});