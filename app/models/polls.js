'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	poll: {
		displayName: String,
		question: String
	},
   voices: {
        voice1: String,
        result1: Number,
        voice2: String,
        result2: Number,
        voice3: String,
        result3: Number,
        voice4: String,
        result4: Number,
        voice5: String,
        result5: Number,
        voice6: String,
        result6: Number
   }
});

module.exports = mongoose.model('Poll', Poll);
