'use strict';

var Poll = require('../models/polls.js');

function pollCreator (req,res) {
    var newPoll = new Poll();
    	newPoll.creationDate = Date.now();
	    newPoll.question = req.body.pollQuestion;
		newPoll.voices.voice1 = req.body.voice1;
		newPoll.voices.voice2 = req.body.voice2;
		newPoll.voices.voice3 = req.body.voice3;
		newPoll.voices.voice4 = req.body.voice4;
	Poll.create(newPoll);
	console.log(newPoll);
	res.redirect(process.env.APP_URL + 'poll?id=' + newPoll.id);
                //***add ajax function to redirect to the voting page after post***
}

module.exports = pollCreator;
