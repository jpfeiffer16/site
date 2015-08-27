var express = require('express'),
    router = express.Router(),
    Page = require('../models/page'),
    mongoFunctions = require('../models/mongo-functions/mongo-helper.js');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/info', function(req, res, next) {
    mongoFunctions.logPageHit('info', function(err, result) {});
  	res.render('info', {
        alias: "Info",
        title: 'Info',
        heading: 'Some extra info'
    });
});