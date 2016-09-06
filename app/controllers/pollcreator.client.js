'use strict';

//this function is used to add a new voice to the poll
(function () {

	var addVoice = document.querySelector('.btn-add');
	var elem = document.getElementById('pollForm');
	var voiceNb = 2

//monitor the event on button to add new voice
	addVoice.addEventListener('click', function () {
		var newVoice = document.createElement("input");
		newVoice.type = 'text';
		newVoice.name = 'voice'+voiceNb;
		voiceNb++
		newVoice.placeholder = 'voice #'+(voiceNb);

//add a new voice and increment the voices counter
		elem.appendChild(newVoice);
		elem.appendChild(document.createElement('br'));
	}, false);

})();