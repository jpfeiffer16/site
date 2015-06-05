var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var MongoHelpers = {
	connect: function(callback) {
		var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server.");
			callback(err, db);
		});
	},
	
	insertResponse: function(rsvpResponse, rsvpCallback) {
  		this.connect(function(err, db) {
			db.collection('rsvp').insertOne( {
		        "name": rsvpResponse.name,
		        "attending": rsvpResponse.accept,
		        "numberAttending": rsvpResponse.attending
		    }, function(err, result) {
				
		        rsvpCallback(err, result);
				db.close();
		    });
		});
	},
	
	updateResponse: function(rsvpResponse, name, rsvpCallback) {
		this.connect(function(err, db) {
			db.collection('rsvp').updateOne({"name" : name}, {
				"name": rsvpResponse.name,
				"attending": rsvpResponse.accept,
				"numberAttending": rsvpResponse.attending
			}, function(err, results) {
				
				rsvpCallback(err, results);
				db.close();
			});
		});
	},
	
	checkExists: function(name, callback) {
		this.connect(function(err, db) {
			var results = [];
			var cursor = db.collection('rsvp').find({"name" : name});
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if(doc != null) {
					results.push(doc);
				}
			});
			
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
			db.close();
		});
	}
}

module.exports = MongoHelpers;