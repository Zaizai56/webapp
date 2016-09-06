'use strict';

(function () {
//get the id# of the poll
    var id = document.getElementById('id').name;
    var element = document.getElementById('poll-datalist');

//variable storing the url to get the poll content
	var loadUrl = appUrl + '/api/:load/poll?id='+id;

//call to obtain the poll content
	ajaxFunctions.ajaxRequest('GET', loadUrl, function (poll) {
        poll = JSON.parse(poll);
//call to the Google chart function
    var l = 0;
    var votecheck = false;
    for (l=0;l<poll.voicer.length;l++){
      if(poll.voicer[l] == poll.userIP) votecheck = true;
    }
    if (votecheck) {
      drawChart(poll.voices);
    } else {
      var i = 0;
      console.log(poll);
//go through the list of voices and call to the radio button builder function
        for (i=0;i<poll.voices.length;i++){
            createElem(poll.voices[i].voice,i);
        }
      var submitVoice = document.createElement('input')
      submitVoice.setAttribute('type','submit','action','send','id','submitVoice','class','btn');
      element.appendChild(submitVoice);

    }
	});

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);


//radio button builder function
    function createElem (val,n) {
//create a elements: radio button, br and label
    var label = document.createElement("label");
    var radio = document.createElement("input");
    var br = document.createElement("BR");
    radio.type = "radio";
    radio.name = 'voices';
    radio.value = n;

//link the radio button to the label
    label.appendChild(radio);

//add the elements to the jade rendered page
    label.appendChild(document.createTextNode(val));
    element.appendChild(label);
    element.appendChild(br);
    };
    
//google standard drawchart function
    function drawChart( chartData ) {
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'voices');
      data.addColumn('number', 'Percentage');
      var j = 0;
      for (j=0;j<chartData.length;j++){
        var q = chartData[j];
        data.addRows([
            [q.voice, q.result]
            ]);
      }

//chart customization option
      var options = {title:'Voices of the world... so far.',
                animation: {
                    duration: 1500,
                    easing: 'out',
                    startup: true},
                width:600,
                height:400,
                legend: 'none'};

      // Instantiate and draw the chart.
      var chart = new google.visualization.ColumnChart(document.getElementById('VoiceChart'));
      chart.draw(data, options);
    }

})();