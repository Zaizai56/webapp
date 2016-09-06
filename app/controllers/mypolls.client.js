'use strict';

(function () {

    var loadUrl = appUrl + '/api/:load/mypolls';
    var element = document.getElementById("mypolls");

//ajax call to get the list of polls for this user
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', loadUrl, function (data) {
        var data = JSON.parse(data);
        var loading = document.getElementById('loading-gif');
        loading.parentNode.removeChild(loading);
        var i=0;
        for (i=0;i<data.length;i++){
            createPollElement (data[i])
            }
    }));

    function createPollElement (val) {
        var element = document.getElementById('mypolls');

//create the element to display the poll: div inside a hyperlink
        var master = document.createElement("div");
        master.setAttribute('class','poll-list');
        var a = document.createElement("a");
        var node = document.createTextNode(val.question);
        a.setAttribute('href',"/poll?id=" + val['_id']);
//add the element in the html content
    master.appendChild(node);
    a.appendChild(master);

    element.appendChild(a);

//create the delete div for this poll.
        var aDelete = document.createElement('a');
        aDelete.setAttribute('href',"/delete?id=" + val['_id']);
        var nodeDelete = document.createTextNode("delete this poll");
        var masterDelete = document.createElement('div');
        masterDelete.setAttribute('class','delete-poll');

        masterDelete.appendChild(nodeDelete);
        aDelete.appendChild(masterDelete);
        element.appendChild(aDelete);

    };

})();