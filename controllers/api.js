var _app,
	_config,
	url = require('url'),
	TwilioCapability = require('../git_modules/TwilioCapability-js/nodejs/lib/TwilioCapability');

module.exports = function(app, appPath) {
	appPath = appPath || '';
	_app = app;
	_config = _app.set('config');
	_app.get(appPath + '/test', test);
	_app.get(appPath + '/token', token);
};

function test(req, res) {
	res.send("{data: 'hello world'}");
}

function token(req, res) {
	console.log(url.parse(req.url, true).query);
	console.log(_config.twilio);
	var clientName = url.parse(req.url, true).query.clientName || 'test',
		capability = new TwilioCapability(_config.twilio.accountSid, _config.twilio.authToken);
	capability
		.allowClientOutgoing(_config.twilio.appSid)
		.allowClientIncoming(clientName)
		.allowEventStream();
	res.send({
		clientName: clientName,
		token: capability.generateToken()
	});
};