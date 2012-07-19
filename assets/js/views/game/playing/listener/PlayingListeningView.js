var PlayingListeningView = Backbone.View.extend({
	className: "listening",
	initialize: function (options) {
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);

		this.activeView = new ChooseRightAnswerView({
			el: $(this.el),
			vent: this.vent,
			template: $("#ChooseRightAnswerView-template").html(),
			model: this.model
		}).bind("next", this.onNext);

	},  
	render: function() {
		this.activeView.render();
		return this;
	},
	onNext: function() {
		this.trigger("next");
	}
});