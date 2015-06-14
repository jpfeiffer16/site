var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var MongoHelpers = {
	connect: function(callback) {
		var url = 'mongodb://admin:admin@ds043062.mongolab.com:43062/wedding';
		// var url = 'mongodb://localhost:27017';
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
	
	removeResponse: function(responseGuid, callback) {
		this.connect(function(err, db) {
			db.collection('rsvp').deleteOne({'_id': responseGuid}, function(err, result) {
				if (err == null) {
					callback(null);
				} else {
					callback(err);
				}
			});
		});
	},
	
	checkExists: function(responseName, callback) {
		this.connect(function(err, db) {
			// var results = [];
			db.collection('rsvp').findOne({name : responseName }, function(err, doc) {
				console.log('Query result:\n', doc);
				
				if (doc != undefined || doc != null) {
					callback(doc);
				} else {
					callback(null); 
				}
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