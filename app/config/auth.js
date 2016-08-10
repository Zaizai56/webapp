'use strict';

module.exports = {
	'facebook': {
    'clientID': process.env.clientID,
    'clientSecret': process.env.clientSecret,
    'callbackURL': process.env.callbackURL
  },'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};
