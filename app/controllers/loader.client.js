'use strict';

(function () {
    
    var loadUrl = appUrl + '/api/:load/polls';
    var element = document.getElementById("lastPolls");

//function to create the list of poll on the homepage 
    function createElem (data) {
    var master = document.createElement("div");
    master.setAttribute('class','poll-list');
    var para = document.createElement("a");
    var node = document.createTextNode(data.question);
    para.setAttribute('href', "/poll?id="+ data["_id"]);
    master.appendChild(node);
    para.appendChild(master);

    element.appendChild(para);
   }

//ajax function to get the list of the 10 last polls created on the application
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', loadUrl, function (data) {
        var pollObject = JSON.parse(data);
        var loading = document.getElementById('loading-gif');
        loading.parentNode.removeChild(loading);

//go through the list of polls and call the function to create the list of polls
        var i=0;
        for (i=0;i<pollObject.length;i++){
            if (pollObject[i].question != null){
                 createElem(pollObject[i]);
            }
        }
    }));

})();