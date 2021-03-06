'use strict';

var Poll = require('../models/polls.js');

//function to create the poll in the mongoDB
function pollCreator (req,res) {
//set the voices object. It will be used to store the list of voices. The total number of voices is variable.
//This loop will go through the list until it reach an undefined value -> voice is non-existing 
	var voices = [];
	var h = 0;
	console.log(req.body);
	for (h=0;h>=0;h++){
		var v = 'voice' + h;
		if (req.body[v] != undefined) {
			voices.push({'voice': req.body[v],'result':0});
		} else {
			h=-2;
		};
	};
//call to mongoDB to create the poll
    var newPoll = new Poll();
    	newPoll.creationDate = Date.now();
    	newPoll.creator = req.user.user.id;
	    newPoll.question = req.body.pollQuestion;
		newPoll.voices =  voices;
		newPoll.voicer = []
	Poll.create(newPoll);
	console.log(newPoll);

//redirect the user to the page of this poll
	res.redirect('/poll?id=' + newPoll.id);
}

module.exports = pollCreator;
