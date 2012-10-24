var User = require('../models/User').Model;
var authentication = require('./authentication');

var _app;

module.exports = function(app, appPath ) {
	_app = app;
	appPath = appPath || '';
	_app.get(appPath, authentication.middleware, index);
};


function index(req, res) {

	User.find(function(err, docs)  {

		res.render('index',  { 
			title: 'Welcome!', 
		 	livereload: _app.set('livereload'),
		 	users: docs
		});

	});

};
