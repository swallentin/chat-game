var PlayingNextTurnView = Backbone.View.extend({
	className: "next-turn",
	initialize: function (options) {
		this.vent = options.vent;
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template({
			message: "Waiting for other party to reply"
		}));

		var that = this;
		setTimeout(function() {
			that.trigger("next");
		}, 2000);
		return this;
	}
});