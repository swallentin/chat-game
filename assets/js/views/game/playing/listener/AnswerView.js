var AnswerView = Backbone.View.extend({
	events: {
		"click .btn-next": "onClickedNext" 
	},
	initialize: function(options) {
		this.message = options.message || "No message provided.";
		this.template = Handlebars.compile( $("#AnswerView-template").html() ),
		this.vent = options.vent || {};
		_.bindAll(this);
	},
	render: function() {
		$(this.el).html(this.template({
			message: this.message
		}));
		return this;
	},
	onClickedNext: function() {
		this.trigger("next");
	}
});

