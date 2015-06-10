var express = require('express'),
  router = express.Router(),
  MongoPage = require('../models/mongo-page'),
  MongoHelper = require('../models/mongo-functions/mongo-helper')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/admin', function (req, res, next) {
    res.render('admin', {
      alias: "Admin",
      title: 'Stats',
      heading: 'Who\'s comming so far',
      responseList: MongoHelper.getResponses()
    });
});