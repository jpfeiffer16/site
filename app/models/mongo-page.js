var MongoPage = function(attributes) {
	if(!attributes) { attributes = {}; }
	this.title = attributes.title;
	this.heading = attributes.heading;
	this.rsvpResponses = attributes.rsvpResponses;
}

module.exports = MongoPage;