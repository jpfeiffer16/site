var express = require('express'),
  router = express.Router(),
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};


router.get('/rsvp', function (req, res, next) {
    res.render('rsvp', {
      alias: "Rsvp",
      title: 'RSVP',
      heading: 'Kindly respond by Oct. 1st 2015'
    });
});