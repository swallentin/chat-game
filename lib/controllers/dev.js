var _app,
  _config,
  url = require('url');
module.exports = function(app, appPath) {
  appPath = appPath || '';
  _app = app;
  _config = _app.set('config');
  _app.get(appPath, index);
  _app.get('/upload', upload);
};

function index(req, res) {
  res.render('dev_index',  { 
    title: 'Welcome!', 
    livereload: _app.set('livereload')
  });
};

function upload(req, res) {
  res.render('dev_upload',  { 
    title: 'Welcome!', 
    livereload: _app.set('livereload'),
  });
};
