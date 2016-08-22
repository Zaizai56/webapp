'use strict';

var Poll = require('../models/polls.js');

function pollLoader () {
    
    this.index = function (req, res) {
        Poll
        .find().limit(10)
        .exec(function(err, polls) {
            if (err) throw err;
            res.json(polls);
        });
    };
    
    this.poll = function (req, res, id) {
        Poll
        .findOne({ '_id': id },{ '_id': false })
        .exec(function(err, polls) {
            if (err) throw err;
            res.json(polls);
        });
    };
    
}
module.exports = pollLoader;