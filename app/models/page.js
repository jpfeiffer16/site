//Define generic page model

var Page = function(attributes) {
	if(!attributes) { attributes = {}; }
	this.title = attributes.title;
	this.heading = attributes.heading;
}

module.exports = Page;