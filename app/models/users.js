'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	user: {
		id: String,
		displayName: String
	},
   nbrClicks: {
        clicks: Number
   }
});

module.exports = mongoose.model('User', User);
