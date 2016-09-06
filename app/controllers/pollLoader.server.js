'use strict';

var Poll = require('../models/polls.js');

//this function regroup differents calls to the mongoDB
function pollLoader () {

//get the list of the last 10 polls
    this.index = function (req, res) {
        Poll
            .find().limit(10).sort('-creationDate')
            .exec(function (err, polls) {
                if (err) { throw err; }

                res.json(polls);
                }
            );
    };

//get the content of a poll - used to load a poll page
    this.poll = function (req, res) {
        Poll
            .findOne({ '_id': req.query.id },{ '_id': false })
            .exec(function(err, polls) {
                if (err) { throw err; }
                polls['userIP'] = req.headers['x-forwarded-for'];
                console.log(polls);
                res.json(polls);
                }
            );
        };

//get the list of polls created by a user
    this.mypolls = function (req, res){
        Poll
            .find({'creator': req.user.user.id}).sort('-creationDate')
            .exec(function (err, polls) {
                if (err) { throw err; }

                res.json(polls);
                }
            );
    }

//vote to a poll. the ip of the req is check to ensure each ip only vote once
    this.vote = function (req, res){
        var increment = {};
        var v = 'voices.' + req.body.voices + '.result';
        increment[v] = 1;
//get the ip of the req
        var userIP = req.headers['x-forwarded-for'];
        Poll
            .findOne({ '_id': req.query.id } )
            .exec(function (err,polls){
                var k = 0;
//check the ip versus ip of the previous vote
                var check = false;
                for (k=0;k<polls.voicer.length;k++){
                    if (polls.voicer[k] == userIP) check = true;
                                    console.log(check);
                };
//if ip have already voted, the user is redirected to the homepage
                if (check) {
                    res.redirect('/');
                } else {
//else, the vote in taken into account in the mongoDB
                    Poll
                        .findOneAndUpdate({ '_id': req.query.id }, { $inc: increment, $push: {'voicer': userIP} }, {new: true})
                        .exec(function (err, result) {
                            if (err) { throw err}
                            var vote = '/api/:vote/poll?id='+req.query.id;
                            res.redirect('/poll?id='+req.query.id);
                })
                }
            })
    }

//delete a poll upon request by a user.
    this.deletepoll = function (req, res){
        Poll
            .findOne({'_id': req.query.id})
            .exec(function (err, poll) {
                if (err) { throw err; }
//check the id of the req, to ensure only the creator of the poll can delete it
                if(poll['creator'] == req.user.user.id){
                    poll.remove(function (err){
                        if (err) {throw err;}
                    })
                }
                res.redirect('/mypolls');
                }
            );
    }
}

module.exports = pollLoader;