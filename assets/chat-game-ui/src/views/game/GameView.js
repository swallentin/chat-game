var GameView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
		this.playingView = new GamePlayingView({
			vent: this.vent
		});
	},
  render: function () {
  	$(this.el).html(this.playingView.render().el);
    return this;
  }
});