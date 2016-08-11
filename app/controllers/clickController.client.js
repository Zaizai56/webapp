'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = appUrl + '/api/:id/clicks';
   var postPollButton = document.querySelector('.btn-postPoll');


   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount)); //update the count of clicks

   postPollButton.addEventListener('click', function () {                           //upon click on post poll button

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {                       //post the new poll - TO UPDATE
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);                //send to the poll vote page - TO UPDATE
      });

   }, false);

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
