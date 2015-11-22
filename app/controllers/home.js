var express = require('express'),
    router = express.Router(),
    Page = require('../models/page'),
    mongoFunctions = require('../models/mongo-functions/mongo-helper.js');

module.exports = function (app) {
    app.use('/', router);
};

var homepageInfo = {
    alias: "Home",
    title: 'MaryAndJoe.me',
    heading: 'Welcome to our site!'
}

router.get('/', function (req, res, next) {
    mongoFunctions.logPageHit('index', function(err, result) {});
    res.render('done', homepageInfo);
});


router.get('/index', function (req, res, next) {
    mongoFunctions.logPageHit('index', function(err, result) {});
    res.render('done', homepageInfo);
});
