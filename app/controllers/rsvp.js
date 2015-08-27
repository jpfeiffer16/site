var express = require('express'),
  router = express.Router(),
  Page = require('../models/page'),
  mongoFunctions = require('../models/mongo-functions/mongo-helper.js');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/rsvp', function (req, res, next) {
    mongoFunctions.logPageHit('rsvp', function(err, result) {});
    res.render('rsvp', {
      alias: "Rsvp",
      title: 'RSVP',
      heading: 'Kindly respond by Oct. 1st 2015'
    });
});