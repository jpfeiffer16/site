var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};

var homepageInfo = {
  alias: "Home",
  title: 'MaryAndJoe.me',
  heading: 'Welcome to our site!'
}

router.get('/', function (req, res, next) {
    res.render('index', homepageInfo);
});


router.get('/index', function (req, res, next) {
    res.render('index', homepageInfo);
});
