var AppRouter = Backbone.Router.extend({
  vent: _.extend({}, Backbone.Events),
  routes: {
    "": "index",
    "game/:id": "game",
  },
  index: function() {
    console.log("index");
  },
  game: function(id) {
    console.log("game/" + id);
    // var game = new Game({
    //   id: id
    // });

    var gameView = new GameView({
      el: $("#game"),
      vent: this.vent
    });
    gameView.render();
  }
});