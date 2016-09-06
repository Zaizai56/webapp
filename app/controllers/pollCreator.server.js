'use strict';

var Poll = require('../models/polls.js');

function pollCreator (req,res) {
	var voices = [];
	var h = 0;
	for (h=0;h>=0;h++){
		var v = 'voice' + h;
		if (req.body[v] != undefined) {
			voices.push({'voice': req.body[v],'result':0});
		} else {
			h=-2;
		};
	};
    var newPoll = new Poll();
    	newPoll.creationDate = Date.now();
    	newPoll.creator = req.user.user.id;
	    newPoll.question = req.body.pollQuestion;
		newPoll.voices =  voices;
		newPoll.voicer = []
	Poll.create(newPoll);
	console.log(newPoll);
	res.redirect('/poll?id=' + newPoll.id);
}

module.exports = pollCreator;
