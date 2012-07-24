var GameListView = Backbone.View.extend({
  className: "game-list",
  tagName: "UL",
	initialize: function (options) {
		this.vent = options.vent || {};
    _.bindAll(this);
	},
	render: function() {
    this.collection.each(this.addItem);
		return this;
	},
  addItem: function(game) {
    var view = new GameListItemView({
      model: game
    });
    var gameEl = view.render().el;
    $(this.el).append(gameEl);
  }
});