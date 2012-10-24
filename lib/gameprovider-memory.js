var gameCounter = 0
    , GameProvider = function() {};

// dummy data
GameProvider.prototype.data = [];

GameProvider.prototype.findAll = function(callback) {
  callback( null, this.data );
};

GameProvider.prototype.findById = function(id, callback) {
  var result = null;

  for (var i = this.data.length - 1; i >= 0; i--) {
    if( this.data[i]._id == id ) {
      result = this.data[i];
      break;
    }
  }

  callback(null, result);
};

GameProvider.prototype.save = function(games, callback) {
  var game = null;

  console.log( typeof(games) === undefined );
  if( typeof(games) == "undefined" )
    games = [games];

  for (var i = games.length - 1; i >= 0; i--) {
    game = games[i];
    game._id = gameCounter++;
    game.created_at = new Date();

    this.data[this.data.length] = game;

  }

  callback(null, games);
};

exports.GameProvider = GameProvider;