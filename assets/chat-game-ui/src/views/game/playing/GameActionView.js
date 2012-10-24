var GameActionView = Backbone.View.extend({
	tagName: "div",
	className: "action quotes",
	initialize: function(options) {

		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");

		// event binding
		_.bindAll(this);

		this.on("load", this.onLoad);

		this.vent.on("/game/#:id/listening", this.renderListening);
		this.vent.on("/game/#:id/speaking", this.renderSpeaking);

	},
	onLoad: function() {},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	renderActiveView: function() {
		$(this.el).find("#content").html(this.activeView.render().el);
	},
	renderListening: function() {
		console.log("GameActionView:renderListening");
		this.activeView = new PlayingListeningView({
			vent: this.vent,
			model: this.model
		}).bind("next", this.onFinishedListening);
		this.renderActiveView();
	},
	renderSpeaking: function() {
		console.log("GameActionView:renderSpeaking");
		this.activeView = new PlayingSpeakingView({
			vent: this.vent,
			model: this.model
		}).bind("next", this.onFinishedSpeaking);
		this.renderActiveView();
	},
	onFinishedListening: function() {
		this.vent.trigger("/game/#:id/speaking");
	},
	onFinishedSpeaking: function() {
		this.vent.trigger("/game/#:id/listening");
	}
});