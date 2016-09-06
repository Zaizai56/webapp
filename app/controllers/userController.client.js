'use strict';

//this function get the name of the user, and display it in the header of the page.
//if the user is unidentified, this function will fall in error
(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

   }));
})();