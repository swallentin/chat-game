var GameStatusView = Backbone.View.extend({
	className: "game-state-info btn-inverse",
	initialize: function(options) {
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});