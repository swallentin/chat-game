
/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./config');

var app = module.exports = express.createServer();
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  // app.use(express.bodyParser({ uploadDir: './uploads', keepExtensions: true}));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.limit('2mb'));
  app.set('config', config);
});

app.configure('development', function(){
  app.set('livereload', true);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// require('./controllers/index')(app, '');
require('./controllers/index')(app, '/');
require('./controllers/game')(app, '/game');
require('./controllers/dev')(app, '/dev');
require('./controllers/debug')(app, '/debug');
require('./controllers/api')(app, '/api');

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
