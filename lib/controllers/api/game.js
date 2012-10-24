var Game = require('mongoose').model('Game')
  , authentication = require('../authentication');

exports.map = function(app, path) {

  // Fetches all current games from mongo
  app.get('/games', get_games);

  // Fetches a game on it's ObjectId
  app.get('/games/:id', get_game);

  // Fetches all games for the currently logged in user
  app.get('/mygames', get_my_games);

  // Creates a new games and return the URL to the new document
  app.post('/games', post_game);

  // Updates an existing game, PUT requires full content
  // app.post('/games/ut', put_game_by_id);
  app.put('/games/:id', game_depopulate_middleware, put_game_by_id);

  // Deletes a game
  app.del('/games/:id', del_game );
  
};

// GET /games
var get_games = exports.get_games = function(req, res) {

  Game.find()
      .populate('player_a')
      .populate('player_b')
      .populate('dialogue')
      .populate('currentParagraph')
      .populate('currentParagraphDefinition')
      .exec(function(err, docs) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        res.send(docs);
        
      });

};

 // GET /game
var get_game = exports.get_game = function(req, res) {

  Game.findById( req.params.id )
      .populate('player_a')
      .populate('player_b')
      .populate('dialogue')
      .populate('currentParagraph')
      .populate('currentParagraphDefinition')
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        
        if( !doc ) {
          res.send(404);
          return;
        }

        res.send(doc);

     });
};

 // GET /game
var get_my_games = exports.get_my_games = function(req, res) {
  
  var userId = req.session.userIdentity._id;

  Game.find({ 
        $or:[ 
        { player_a: userId }, 
        { player_b: userId }
        ]})
      .populate('player_a')
      .populate('player_b')
      .populate('dialogue')
      .populate('currentParagraph')
      .populate('currentParagraphDefinition')
      .exec(function(err, docs) {
        res.send(docs);
      });

};

// POST /games/{id}
var put_game_by_id = exports.put_game_by_id = function(req, res) {


  Game.findByIdAndUpdate(req.params.id, req.body)
      .populate('player_a')
      .populate('player_b')
      .populate('dialogue')
      .populate('currentParagraph')
      .populate('currentParagraphDefinition')
      .exec(function(err, doc) {

        console.log(err);
        console.log(doc);

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }

        res.send(doc);

    });
};

// DELETE /games/{id}
var del_game = exports.del_game = function(req, res) {

  Game.findByIdAndRemove( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }

        if( doc == 'undefined') {
          res.send(404);
          return;
        }

        res.send(200);
      });
};

// POST /games
var post_game = exports.post_game = function(req, res) {

  var game = new Game(req.body);

  game.save(function(err, doc) {
    setDocumentLoacationHeader(res, doc);
    res.status(201).json(doc);
  });

};

var game_depopulate_middleware = exports.game_depopulate_middleware = function(req, res, next)  {

  var object = req.body;

  delete object._id;

  for (var field in Game.schema.paths) {
    if (Game.schema.paths[field].instance == 'ObjectID' && typeof(object[field]) == 'object' && object[field]._id != 'undefined')
      object[field] = object[field]._id;
  }

  next();

};

function setDocumentLoacationHeader(res, doc) {
  res.setHeader("Location", doc._id );
}
