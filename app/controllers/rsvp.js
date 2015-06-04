var express = require('express'),
  router = express.Router(),
  //Article = require('../models/article');
  Page = require('../models/page')

module.exports = function (app) {
  app.use('/', router);
  
//  app.route('/rsvp').post(function(req, res) {
//    console.log(req.body);
//  });
};


router.get('/rsvp', function (req, res, next) {
    res.render('rsvp', {
      alias: "Rsvp",
      title: 'RSVP',
      heading: 'Kindly respond by Oct. 1st 2015'
    });
});



//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
//
//var insertRsvp = function(db, name, attending, numberAttending, callback) {
//    db.collection('rsvp').insertOne( {
//        "name": name,
//        "attending": attending,
//        "numberAttending": numberAttending
//    }, function(err, result) {
////        assert.equal(err, null);
////        console.log("Inserted a document into the rsvp collection.");
//        callback(err, result);
//    });
//};
//
//function insertResponse (rsvpResponse, rsvpCallback) {
//  var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
//  MongoClient.connect(url, function(err, db) {
//      assert.equal(null, err);
//      console.log("Connected correctly to server.");
//      insertRsvp(db, rsvpResponse.name, rsvpResponse.accept, rsvpResponse.attending, function (err, result) {
//          db.close();
//          rsvpCallback(err, result);
//      });
//  });
//}

var helpers = require('../models/mongo-functions/mongo-helper.js');

router.post('/rsvp', function(req, res, next) {
    console.log(req.body);
//    console.log('Sending dummy sucess');
//    res.status(200);
//    res.send('Success');
    helpers.insertResponse(req.body, function (err, result) {
//      console.log(result);
      if (err == null) {
          res.status(200);
          res.send('Success');
      } else {
          res.status(500);
          res.send('Faliure');
      }
    });
});