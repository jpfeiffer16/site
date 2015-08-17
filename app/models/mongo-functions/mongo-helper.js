/* global process */
var MongoClient = require('mongodb').MongoClient;
var MongoDB = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var MongoHelpers = {
	connect: function(callback) {
		var config,
			mongoUsername,
			mongoPassword;
		
		try {
			config = require('../../../config/enviro.js');
			mongoUsername = config.mongoUsername;
			mongoPassword = config.mongoPassword;
		} catch(e) {
			if (process.env.mongoUsername != undefined && process.env.mongoPassword != undefined) {
				mongoUsername = process.env.mongoUsername;
				mongoPassword = process.env.mongoPassword;
			} else {
				throw e;
			}
		}
		
		
		var url = 'mongodb://' + mongoUsername + ':' + mongoPassword + '@ds043062.mongolab.com:43062/wedding';
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
	
	removeResponse: function(rsvpIdentifier, callback) {
		this.connect(function(err, db) {
			db.collection('rsvp').remove({name: rsvpIdentifier}, 1, function(err, result) {
				callback(err, result);
				db.close();
			});
		});
	},
	
	checkExists: function(responseName, callback) {
		this.connect(function(err, db) {
			db.collection('rsvp').find({name : responseName }).toArray(function (err, docs) {
				if (docs.length > 0) {
					callback(docs[0]);
				} else {
					callback(null);
				}
				db.close();
			});
		});
	},
	
	getResponses: function(callback) {
		this.connect(function(err, db) {
			var results = [];
			var cursor = db.collection('rsvp').find();
			cursor.each(function(err, item) {
				if(item != null) {
					results.push(item);
				} else {
					callback(results, err);
				}
			});
		});
	}
};

module.exports = MongoHelpers;