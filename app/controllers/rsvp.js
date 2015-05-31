var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};


router.get('/rsvp', function (req, res, next) {
    res.render('rsvp', {
      alias: "Rsvp",
      title: 'RSVP',
      heading: 'Rsvp if you are comming to the wedding'
    });
});