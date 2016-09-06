'use strict';

(function () {
    
    var loadUrl = appUrl + '/api/:load/polls';
    var element = document.getElementById("lastPolls");
    
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

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', loadUrl, function (data) {
        var pollObject = JSON.parse(data);
        var loading = document.getElementById('loading-gif');
        loading.parentNode.removeChild(loading);
        var i=0;
        for (i=0;i<pollObject.length;i++){
            if (pollObject[i].question != null){
                 createElem(pollObject[i]);
            }
        }
    }));

})();