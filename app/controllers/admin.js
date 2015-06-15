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
      for(var i = 0; i < results.length; i++) {
        var isAttending = results[i].attending;
        if (isAttending == 'true') {
          results[i].attending = "Yes";
        } else {
          results[i].attending = "No";
        }
      }
      response.responseList = results;
      console.log('Results:', results);
      res.render('admin', response);
    });
});