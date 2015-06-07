var express = require('express'),
  router = express.Router(),
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/info', function(req, res, next) {
	res.render('info', {
      alias: "Info",
      title: 'Info',
      heading: 'Some extra info'
    });
});