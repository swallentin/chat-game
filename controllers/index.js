var _app;

module.exports = function(app, appPath ) {
	_app = app;
	appPath = appPath || '';
	_app.get(appPath, index);
};


function index(req, res) {
	res.render('index',  { 
		title: 'Welcome!', 
	 	livereload: _app.set('livereload'),
	});
};

