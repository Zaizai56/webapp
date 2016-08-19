'use strict';

var Poll = require('../models/polls.js');

function pollCreator (req,res) {
    var newPoll = new Poll();
    	newPoll.creationDate = Date.now();
	    newPoll.question = req.body.pollQuestion;
		newPoll.voices.voice1 = req.body.voice1;
	Poll.create(newPoll);
	console.log(newPoll);
                //***add ajax function to redirect to the voting page after post***
}

module.exports = pollCreator;
