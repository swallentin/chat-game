var _app,
  _config,
  url = require('url');

module.exports = function(app, appPath) {
  appPath = appPath || '';
  _app = app;
  _config = _app.set('config');
  _app.get(appPath, dev);
};

function dev(req, res) {
  res.render('debug',  { 
    title: 'Welcome!', 
    livereload: _app.set('livereload'),
    twilio: _app.set('config').twilio
  });
};