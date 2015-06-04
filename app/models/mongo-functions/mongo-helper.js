var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var MongoHelpers = {
	conntect: function() {
		var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");
			return db;
		});
	},
	
	insertRsvp: function(db, name, attending, numberAttending, callback) {
	    db.collection('rsvp').insertOne( {
	        "name": name,
	        "attending": attending,
	        "numberAttending": numberAttending
	    }, function(err, result) {
	//        assert.equal(err, null);
	//        console.log("Inserted a document into the rsvp collection.");
	        callback(err, result);
	    });
	},
	
	
	
	insertResponse: function(rsvpResponse, rsvpCallback) {
  		var db = MongoHelpers.conntect();
		  
		db.collection('rsvp').insertOne( {
	        "name": rsvpResponse.name,
	        "attending": rsvpResponse.accept,
	        "numberAttending": rsvpResponse.attending
	    }, function(err, result) {
			db.close();
	        rsvpCallback(err, result);
	    });
		
//		MongoHelpers.insertRsvp(db, rsvpResponse.name, rsvpResponse.accept, rsvpResponse.attending, function (err, result) {
//			db.close();
//			rsvpCallback(err, result);
//		});
	},
	
	
}

module.exports = MongoHelpers;