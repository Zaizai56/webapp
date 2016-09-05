'use strict';

(function () {
//get the id# of the poll
    var id = document.getElementById('id').name;

//variable storing the url to get the poll content
	var loadUrl = appUrl + '/api/:load/poll?id='+id;

//call to obtain the poll content
	ajaxFunctions.ajaxRequest('GET', loadUrl, function (poll) {
        poll = JSON.parse(poll);
        var i = 0;
//go through the list of voices and call to the radio button builder function
        for (i=0;i<poll.voices.length;i++){
            createElement(poll.voices[i].voice,i);
        }
//call to the Google chart function
    drawChart(poll.voices);
	});

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);


//radio button builder function
    function createElement (val,n) {
    var element = document.getElementById('poll-datalist');

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