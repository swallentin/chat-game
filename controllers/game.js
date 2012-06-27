var _app,
    url = require('url');

module.exports = function(app, appPath) {
  appPath = appPath || '';
  _app = app;
  _app.get(appPath + "/", game);
};

function game(req, res) {
  res.render('game', {
    title: 'Game!',
    livereload: _app.set('livereload')
  });
};