var fs = require('fs'),
		filename = './data/uploads/sample-recording.wav';

exports.map = function(app, appPath) {
	app.get('/game/recording/:id', handleRecoringDownload);
	app.post('/game/recording/:id', handleRecoringUpload);
};

function handleRecoringDownload (req, res) {
	console.log("sending file");
	res.contentType(filename);
	res.sendfile(filename);
}

function handleRecoringUpload (req, res) {

	var responseData = {};

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