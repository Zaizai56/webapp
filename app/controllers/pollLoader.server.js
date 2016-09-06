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

    this.poll = function (req, res) {
        Poll
            .findOne({ '_id': req.query.id },{ '_id': false })
            .exec(function(err, polls) {
                if (err) { throw err; }
                res.json(polls);
                }
            );
        };

    this.mypolls = function (req, res){
        Poll
            .find({'creator': req.user.user.id}).sort('-creationDate')
            .exec(function (err, polls) {
                if (err) { throw err; }

                res.json(polls);
                }
            );
    }

    this.vote = function (req, res){
        var increment = {};
        var v = 'voices.' + req.body.voices + '.result';
        increment[v] = 1;
        var userIP = req.headers['x-forwarded-for'];
        Poll
            .findOne({ '_id': req.query.id } )
            .exec(function (err,polls){
                var k = 0;
                for (k=0;k<polls.voicer.length;k++){
                    if (polls.voicer[k] == userIP) res.redirect('/');
                }
            })
        Poll
            .findOneAndUpdate({ '_id': req.query.id }, { $inc: increment, $push: {'voicer': userIP} }, {new: true})
            .exec(function (err, result) {
                if (err) { throw err}
                var vote = '/api/:vote/poll?id='+req.query.id;
                res.redirect('/poll?id='+req.query.id);
            });
    }

    this.deletepoll = function (req, res){
        Poll
            .findOne({'_id': req.query.id})
            .exec(function (err, poll) {
                if (err) { throw err; }
                poll.remove(function (err){
                    if (err) {throw err;}
                })
                res.redirect('/mypolls');
                }
            );
    }
}

module.exports = pollLoader;