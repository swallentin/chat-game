var _app,
	_config,
	url = require('url'),
	TwilioCapability = require('../git_modules/TwilioCapability-js/nodejs/lib/TwilioCapability'),
	uuid = require('node-uuid'),
	fs = require('fs');

module.exports = function(app, appPath) {
	appPath = appPath || '';
	_app = app;
	_config = _app.set('config');
	// _app.get(appPath + '/test', test);
	_app.get(appPath + '/token', token);
	_app.get('/game/recording/:id', handleRecoringDownload);
	_app.post('/game/recording/:id', handleRecoringUpload);
};

var filename = './uploads/sample-recording.wav';

function handleRecoringDownload (req, res) {
	console.log("sending file");
	res.contentType(filename);
	res.sendfile(filename);
}

function handleRecoringUpload (req, res) {

	var responseData = {};

	// console.log(req);
	// console.log(req.files);

	// if( !req.files && !req.files.recording) {
	// 	console.log("no file uploaded");

	// 	responseData = {
	// 		error: 'No files uploaded.'
	// 	};
	// }
	// else if( req.files && req.files.recording && 'audio/wav' != req.files.recording.type ) {
	// 	console.log('cannot handle any other format then wav files');

	// 	responseData = {
	// 		error: 'File format is not supported.'
	// 	};

	// }
	// else {
	// 	console.log(req.path)
	//   // console.log(req.files.recording.type);
	//   // console.log(req.files.recording);

	  // responseData = {
	  // 	game: {
	  // 		players: [{
	  // 			id: 12,
	  // 			name: 'chuck'
	  // 		},{
	  // 			id: 13,
	  // 			name: 'mrs. Json'
	  // 		}],
	  // 		state: {
	  // 			action: 12
	  // 		}
	  // 	}
	  // };
	// }
	  responseData = {
	  	game: {
	  		players: [{
	  			id: 12,
	  			name: 'chuck'
	  		},{
	  			id: 13,
	  			name: 'mrs. Json'
	  		}],
	  		state: {
	  			action: 12
	  		}
	  	}
	  };
	// console.log(req.is('audio/x-wav'));
	// console.log(req.headers);
	// console.log(req.body);
  // console.log(responseData);
  var reqData = '';

  req.setEncoding('binary');

  req.on('data', function(data){
  	reqData += data;
  });

  req.on('end', function(){
	  fs.writeFile(filename, reqData, 'binary', function(err) {
	  	if(err)
	  		console.log(err);
	  	else
	  		console.log("upload worked");

  	  res.send(responseData);

	  });
  });
};

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

// function test(req, res) {
// 	res.send("{data: 'hello world'}");
// }