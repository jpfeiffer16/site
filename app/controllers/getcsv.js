var express = require('express'),
  router = express.Router();
  
module.exports = function (app) {
  app.use('/', router);
};


var mongo = require('../models/mongo-functions/mongo-helper.js');
router.post('/getcsv', function(req, res, next) {
  var fileTitle = Date.now.toString() + '.csv';
  
  mongo.getResponses(function (responseList){
    var csvString = 'Name,Attending,Number' + String.fromCharCode(10);
    
  	for (var i = 1; i < responseList.length; i++) {
  		var rsvp = responseList[i];
  		var name = rsvp.name;
  		var attending = rsvp.attending;
  		var numberAttending = rsvp.numberAttending;
  		csvString = csvString + name + ',' + attending + ',' + numberAttending + String.fromCharCode(10);
  	}
    res.send(csvString);
  });  
});