var GamesListView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
	},
	render: function() {
		$(this.el).html("<h1>GamesListView</h1>");
		return this.el;
	}
});