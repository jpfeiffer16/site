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
      heading: 'Kindly respond by Oct. 1st 2015'
    });
});





var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;


router.post('/rsvp', function(req, res, next) {
    console.log(req.data);
});
//
//var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server.");
//    insertDocument()
//    db.close();
//});
//
//var insertRsvp = function(db, name, attending, numberAttending, callback) {
//    db.collection('restaurants').insertOne( JSON.stringify({
//        name: name,
//        attending: attending,
//        numberAttending: numberAttending
//    }), function(err, result) {
//        assert.equal(err, null);
//        console.log("Inserted a document into the rsvp collection.");
//        callback(result);
//    });
//};