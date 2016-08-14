'use strict';

(function () {

    var pollQuestion = document.querySelector('#pollQuestion');
    var voice1 = document.querySelector('#voice1');
    var postPollButton = document.querySelector('#btn-postPoll');
    var Poll = require('../models/polls.js');

    postPollButton.addEventListener('click', function () {                      //upon click on post poll button
        console.log("starting post");
        var newPoll = new Poll();
		    newPoll.poll.question = pollQuestion.value;
			newPoll.voices.voice1 = voice1.value;
		Poll.create(newPoll, { '_id': false });
		console.log("ok");
		console.log(newPoll);
                //***add ajax function to redirect to the voting page after post***
   }, false);
})();
