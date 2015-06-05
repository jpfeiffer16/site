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

var mongo = require('../models/mongo-functions/mongo-helper.js');
var assert = require('assert');
router.post('/rsvp', function(req, res, next) {
    console.log(req.body);
    
    function respond(responseObject, status) {
        res.status(status);
        res.send(responseObject);
    }
//    console.log('Sending dummy sucess');
//    res.status(200);
//    res.send('Success');
//    console.log(helpers.insertResponse);
    mongo.checkExists(req.body.name, function(result) {
          if (result != null) {
              mongo.updateResponse(req.body, req.body.name, function(err, results) {
                  if (err == null) {
                      respond({
                          success: true,
                          resultType: 'Updated',
                          resultObject: {}
                      }, 200);
                  } else {
                    respond({
                        success: false
                    }, 500);
                  }
              });
          } else {
              mongo.insertResponse(req.body, function (err, result) {
              if (err == null) {
                  respond({
                      success: true,
                      resultType: 'Inserted',
                      resultObject: {}
                  }, 200);
//                  res.status(200);
//                  res.send({
//                      success: true,
//                      resultType: 'Inserted',
//                      resultObject: {}
//                  });
              } else {
                  respond({
                      success: false
                  }, 500);
//                  res.status(500);
//                  res.send({
//                      success: false
//                  });
              }
            });
          }
      });
});