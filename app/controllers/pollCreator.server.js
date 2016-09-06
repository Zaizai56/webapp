'use strict';

var Poll = require('../models/polls.js');

function pollCreator (req,res) {
	var voices = [];
	if (req.body.voice1 != "") voices.push({'voice': req.body.voice1,'result':0});
	if (req.body.voice2 != "") voices.push({'voice': req.body.voice2,'result':0});
	if (req.body.voice3 != "") voices.push({'voice': req.body.voice3,'result':0});
	if (req.body.voice4 != "") voices.push({'voice': req.body.voice4,'result':0});
	var results = [0,0,0,0]
    var newPoll = new Poll();
    	newPoll.creationDate = Date.now();
    	newPoll.creator = req.user.user.id;
	    newPoll.question = req.body.pollQuestion;
		newPoll.voices =  voices;
		newPoll.results = results
		newPoll.voicer = []
	Poll.create(newPoll);
	console.log(newPoll);
	res.redirect('/poll?id=' + newPoll.id);
}

module.exports = pollCreator;
