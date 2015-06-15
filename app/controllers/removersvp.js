var express = require('express'),
  router = express.Router();
  
module.exports = function (app) {
  app.use('/', router);
};


var mongo = require('../models/mongo-functions/mongo-helper.js');
var assert = require('assert');
router.post('/removersvp', function(req, res, next) {
    function respond(responseObject, status) {
        res.status(status);
        res.send(responseObject);
    }
    
    mongo.removeResponse(req.body.name, function(err, result) {
      console.log(err);
      // console.log(result)
      result = JSON.parse(result);
      console.log(result.n);
      console.log(result.ok);
      if(err == null && result.n != 0 && result.ok == 1) {
          respond({result: 'Success'}, 200);
      } else {
          respond({result: 'Failure'}, 500);
      }
    });
});