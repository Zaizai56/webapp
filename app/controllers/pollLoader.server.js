'use strict';

var Poll = require('../models/polls.js');

function pollLoader (req, res) {
    console.log('this is running');
    Poll.find().limit(10).exec(function(err, polls) {
        if (err) throw err;
        res.json(polls);
    });
}
module.exports = pollLoader;