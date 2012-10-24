var AppRouter = Backbone.Router.extend({
  vent: _.extend({}, Backbone.Events),
  routes: {
    // TODO: index should games-list
    "game/:id": "game",
    "": "index"
  },
  index: function() {
    var myGames = new Games();
    myGames.fetch({
      success: function() {
        var gameListView = new GameListView({
          collection: myGames
        });
        $("#game").html(gameListView.render().el);
      }
    });

  },
  game: function(id) {
    var that = this;
    var game = new Game({
      _id: id
    });
    game.fetch({
      success: function(model, response) {
        var gameView = new GameView({
          el: $("#game"),
          vent: that.vent,
          model: model
        });
        $("#game").html(gameView.render().el);
      }
    });
  }
});