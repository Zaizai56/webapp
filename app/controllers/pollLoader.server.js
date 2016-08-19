'use strict';

var Poll = require('./app/models/polls.js');

if (window.addEventListener) {
    window.addEventListener('load', WindowLoad, false);
} else if (window.attachEvent) { // IE
    window.attachEvent('onload', WindowLoad);
}

function updateHtmlElement (data, element, userProperty) {
   element.innerHTML = data[userProperty];
}
function WindowLoad(event) {
console.log("code is running");
Poll.find().limit(10).exec(function(err, posts) {
    // update the content of index.html
    if (err) throw err;
    console.log("this is running too..." + posts);
    var i=0;
    for (i=0;i<10;i++){
    updateHtmlElement(posts[i], 'poll'+i, 'question');
    }
});
console.log("reached here");
}