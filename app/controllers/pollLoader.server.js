'use strict';

var Poll = require('../models/polls.js');

function pollLoader () {
    
    this.index = function (req, res) {
        Poll
            .find().limit(10).sort('-creationDate')
            .exec(function (err, polls) {
                if (err) { throw err; }

                res.json(polls);
                }
            );
    };
        
}

module.exports = pollLoader;