'use strict';

var Users = require('../models/users.js');
var Poll = require('../models/polls.js');

function ClickHandler () {
	
	this.postPoll = function (req, res) {
		Poll
			.create({ 'poll.displayName': req.user.user.id }, { '_id': false })
	};
	
	this.getClicks = function (req, res) {
		Users
			.findOne({ 'user.id': req.user.user.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'user.id': req.user.user.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'user.id': req.user.user.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
