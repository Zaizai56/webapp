'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var pollCreator = require(path + '/app/controllers/pollCreator.server.js');
var PollLoader = require(path + '/app/controllers/pollLoader.server.js');
var Poll = require('../models/polls.js');


module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollLoader = new PollLoader();


	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/newPoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newPoll.html');
	});

	app.route('/postPoll')
		.post(isLoggedIn, pollCreator);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.user);
		});
	
	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	app.route('/api/:load/polls')
		.get(isLoggedIn, pollLoader.index);
		
	app.get('/poll', function(req, res){
		Poll
            .findOne({ '_id': req.query.id },{ '_id': false })
            .exec(function(err, polls) {
                if (err) { throw err; }
                
		res.render('poll', { question: polls.question, voice1: polls.voices.voice1, voice2: polls.voices.voice2, voice3: polls.voices.voice3, voice4: polls.voices.voice4});
            });
	});

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
