var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "games/:id": "games",
  },
  index: function() {
    console.log("index");
  },
  games: function(id) {
    console.log("games/" + id);
  }
});