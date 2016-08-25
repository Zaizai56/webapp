'use strict';

(function () {
    var id = document.getElementById('id').innerHTML;
    var voice1 = document.getElementById('btn1');
    var voice2 = document.getElementById('btn2');
    var voice3 = document.getElementById('btn3');
    var voice4 = document.getElementById('btn4');
    var res1 = document.getElementById('result1');
    var res2 = document.getElementById('result2');
    var res3 = document.getElementById('result3');
    var res4 = document.getElementById('result4');

	var loadUrl = appUrl + '/api/:load/poll?id='+id;

	ajaxFunctions.ajaxRequest('GET', loadUrl, function (data) {
            data = JSON.parse(data);
            voice1.innerHTML = data.voices.voice1;
            voice2.innerHTML = data.voices.voice2;
            voice3.innerHTML = data.voices.voice3;
            voice4.innerHTML = data.voices.voice4;
			res1.innerHTML = data.voices.result1;
			res2.innerHTML = data.voices.result2;
			res3.innerHTML = data.voices.result3;
			res4.innerHTML = data.voices.result4;
		});

    
    voice1.addEventListener('click', function () {
	    ajaxFunctions.ajaxRequest('GET', loadUrl+"&voice=1", function (data1) {
            data1 = JSON.parse(data1);
			res1.innerHTML = data1.voices.result1;
		});
    }, false);

    voice2.addEventListener('click', function () {
	    ajaxFunctions.ajaxRequest('GET', loadUrl+"&voice=2", function (data2) {
            data2 = JSON.parse(data2);
			res2.innerHTML = data2.voices.result2;
		});
    }, false);

    voice3.addEventListener('click', function () {
	    ajaxFunctions.ajaxRequest('GET', loadUrl+"&voice=3", function (data3) {
            data3 = JSON.parse(data3);
			res3.innerHTML = data3.voices.result3;
		});
    }, false);

    voice4.addEventListener('click', function () {
	    ajaxFunctions.ajaxRequest('GET', loadUrl+"&voice=4", function (data4) {
            data4 = JSON.parse(data4);
			res4.innerHTML = data4.voices.result4;
		});
    }, false);

})();