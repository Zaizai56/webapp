'use strict';

(function () {
    function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty]; 
   }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', appUrl + '/api/:load/polls', function (data) {
        var pollObject = JSON.parse(data);
        
        console.log("code is running");
//        var i=0;
//        for (i=0;i<10;i++){
//        updateHtmlElement(posts[i], 'poll'+i, 'question');
//    }
    
    console.log("reached here");
    }));
});