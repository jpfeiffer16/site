var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};


router.get('/credits', function (req, res, next) {
    res.render('credits', {
      alias: "Credits",
      title: 'Credits',
      heading: 'Some of the technologies used in the site'
    });
});