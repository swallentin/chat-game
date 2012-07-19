var _app;

module.exports = function(app, appPath ) {
	_app = app;
	appPath = appPath || '';
	_app.get(appPath, index);
	_app.get('/upload', upload);
};


function index(req, res) {
	res.render('index',  { 
		title: 'Welcome!', 
	 	livereload: _app.set('livereload'),
	});
};

function upload(req, res) {
	res.render('upload',  { 
		title: 'Welcome!', 
	 	livereload: _app.set('livereload'),
	});
};
