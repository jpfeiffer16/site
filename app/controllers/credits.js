var express = require('express'),
    router = express.Router(),
    Page = require('../models/page'),
    mongoFunctions = require('../models/mongo-functions/mongo-helper.js');

module.exports = function (app) {
    app.use('/', router);
};


router.get('/credits', function (req, res, next) {
    mongoFunctions.logPageHit('credits', function(err, result) {});
    res.render('credits', {
        alias: "Credits",
        title: 'Credits',
        heading: 'Some of the technologies used in this site'
    });
});