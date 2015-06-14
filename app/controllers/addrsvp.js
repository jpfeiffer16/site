var express = require('express'),
  router = express.Router();
  
module.exports = function (app) {
  app.use('/', router);
};


var mongo = require('../models/mongo-functions/mongo-helper.js');
var assert = require('assert');
router.post('/addrsvp', function(req, res, next) {
//    console.log('Sending dummy sucess');
//    res.status(200);
//    res.send('Success');
//    console.log(helpers.insertResponse);
//    console.log(req.body);
    
    function respond(responseObject, status) {
        res.status(status);
        res.send(responseObject);
    }
    
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