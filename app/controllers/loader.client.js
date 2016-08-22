'use strict';

(function () {
    
    var loadUrl = appUrl + '/api/:load/polls';
    
    function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = "<a href='/poll?id="+ data["_id"] +"'>" + data[userProperty] + "</a>"; 
   }

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', loadUrl, function (data) {
        var pollObject = JSON.parse(data);
        var i=0;
        for (i=0;i<10;i++){
            if (pollObject[i].question != null){
                updateHtmlElement(pollObject[i], document.querySelector('#poll'+i), 'question');
            }
        }
    }));

})();