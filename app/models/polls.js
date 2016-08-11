'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	poll: {
		displayName: String,
		question: String
	},
   choice: {
        choice1: String,
        result1: Number,
        choice2: String,
        result2: Number,
        choice3: String,
        result3: Number,
        choice4: String,
        result4: Number,
        choice5: String,
        result5: Number,
        choice6: String,
        result6: Number
   }
});

module.exports = mongoose.model('User', User);
