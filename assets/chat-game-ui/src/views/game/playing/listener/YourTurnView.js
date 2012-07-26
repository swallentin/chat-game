var YourTurnView = Backbone.View.extend({
	className: "next-turn",
	initialize: function (options) {
		this.vent = options.vent;
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template({
			message: "It's your turn now."
		}));
		return this;
	}
});