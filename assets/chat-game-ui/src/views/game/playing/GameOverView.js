var GameOverView = Backbone.View.extend({
	className: "game-over",
	initialize: function (options) {
		this.vent = options.vent || {};
	}
});