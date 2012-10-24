var GamePlayingView = Backbone.View.extend({
	className: "playing",
	tagName: "div",
	initialize: function(options) {
		this.vent = options.vent || {};
    var self = this;

		this.statusView = new GameStatusView({
			vent: this.vent,
			model: self.model,
			template: $("#GameStatusView-template").html()
		});

		this.actionView = new GameActionView({
			vent: this.vent,
			template: $("#GameActionView-template").html(),
			model: self.model
		});

	},
	render: function() {
		$(this.el).append(this.statusView.render().el);
		$(this.el).append(this.actionView.render().el);
		this.vent.trigger("/game/#:id/speaking");
		return this;
	}
});