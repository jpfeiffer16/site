var express = require('express'),
  router = express.Router(),
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
};