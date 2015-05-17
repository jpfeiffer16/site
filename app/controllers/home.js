var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      alias: "Home",
      title: 'MaryAndJoe.com',
      heading: 'Welcome to our site!'
    });
});


router.get('/index', function (req, res, next) {
    res.render('index', {
      alias: "Home",
      title: 'MaryAndJoe.com',
      heading: 'Welcome to our site!'
    });
});
