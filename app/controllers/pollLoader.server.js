'use strict';

function pollCreator (req, res) {
var Poll = require('./app/models/polls.js');

console.log('loaded');

Poll.find().limit(10).exec(function(err, posts) {
    // update the content of index.html
    if (err) throw err;
    console.log("this is running too..." + posts);
    res.json(posts);

});
console.log("reached here");
}