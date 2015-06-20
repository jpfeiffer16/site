var MongoClient = require('mongodb').MongoClient;
var MongoDB = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var MongoHelpers = {
	connect: function(callback) {
		// var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
		var url = 'mongodb://localhost:27017';
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
	
	removeResponse: function(rsvpIdentifier, callback) {
		this.connect(function(err, db) {
			console.log('Guid:\n', rsvpIdentifier);
			// console.log('ObjectId converted Guid:');
			// console.dir(ObjectId(rsvpIdentifier));
			//{_id: ObjectId(rsvpIdentifier)}
			db.collection('rsvp').remove({name: rsvpIdentifier}, 1, function(err, result) {
				console.log('Debug:');
				console.dir(result);
				console.dir(err);
				callback(err, result);
				db.close();
			});
		});
	},
	
	checkExists: function(responseName, callback) {
		this.connect(function(err, db) {
			db.collection('rsvp').find({"name" : responseName }, function(err, doc) {
				console.log('Query result:\n', doc);
				callback(doc);
			});
			db.close();
		});
	},
	
	getResponses: function(callback) {
		this.connect(function(err, db) {
			var results = [];
			var cursor = db.collection('rsvp').find();
			cursor.each(function(err, item) {
				if(item != null) {
					console.log(typeof(item));
					results.push(item);
				} else {
					callback(results, err);
				}
			});
			
		});
	}
};

module.exports = MongoHelpers;