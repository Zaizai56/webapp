'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	question: String,
	creationDate: Number,
    creator: Number,
    voices: Object,
    voicer: Object,
});

module.exports = mongoose.model('Poll', Poll);
