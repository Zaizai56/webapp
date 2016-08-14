'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = appUrl + '/api/:id/clicks';
   var postURL = "https://webapp-zaizai.c9users.io/api/postPoll";


   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount)); //update the count of clicks

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {                       //update the click by POST reauest on apiURL
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);                //update the count of clicks
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {                     // delete clicks by DELETE reauest on apiURL
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);                //update the count of clicks
      });

   }, false);

})();
