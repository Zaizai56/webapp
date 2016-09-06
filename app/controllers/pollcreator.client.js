'use strict';

(function () {

	var addVoice = document.querySelector('.btn-add');
	var elem = document.getElementById('pollForm');
	var voiceNb = 2

	addVoice.addEventListener('click', function () {
		var newVoice = document.createElement("input");
		newVoice.setAttribute('type','text','value','','name','voice'+voiceNb);

		elem.appendChild(newVoice);
		elem.appendChild(document.createElement('br'));
		voiceNb++
	}, false);

})();