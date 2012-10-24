
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config')
  , models = require('./lib/models')
  , mongoose = require('mongoose');
;

var app = module.exports = express.createServer();
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(require('./lib/middleware/debug'));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'i can haxx' }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(express.limit('2mb'));
  app.set('config', config);

});

app.configure('development', function(){
  app.use('/chat-game-ui', express.static(__dirname + '/assets/chat-game-ui/lib'));
  app.set('livereload', true);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./lib/controllers/api/game').map(app);
require('./lib/controllers/api/user').map(app);
require('./lib/controllers/api/paragraph').map(app);
require('./lib/controllers/api/recording').map(app);
require('./lib/controllers/authentication').map(app);
require('./lib/controllers/index')(app, '/');
require('./lib/controllers/dev')(app, '/dev');


mongoose.connect(config.mongodb);
app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
