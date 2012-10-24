var GameView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
		this.playingView = new GamePlayingView({
			vent: this.vent,
      model: this.model
		});
	},
  render: function () {
    return this.playingView.render();
  }
});