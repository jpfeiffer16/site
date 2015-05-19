var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};


router.get('/about', function (req, res, next) {
    res.render('about', {
      alias: "About",
      title: 'About Us',
      heading: 'Stuff'
    });
});