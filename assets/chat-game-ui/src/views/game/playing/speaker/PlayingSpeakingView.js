var PlayingSpeakingView = Backbone.View.extend({
	// Element settings
	// View initialization and render
	initialize: function(options) {

		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");

		// setup event stuff
		_.bindAll(this);

		this.on("onload", this.onLoad);
		this.trigger("onload");

	},
	render: function() {
		$(this.el).html(this.activeView.render().el);
		return this;
	},
	onLoad: function() {
		// TODO: Insert get paragraph options here
		var choose = new PlayingChooseWhatToSay({
			vent: this.vent,
			template: $("#PlayingChooseWhatToSay-template").html(),
			model: this.model
		}).bind("clickedQuestion", this.onClickedQuestion);
		this.activeView = choose;
	},

	// Events
	onClickedQuestion: function(e) {
		console.log("PlayingSpeakingView:onClickedQuestion");

		// post the selected paragraph to the api

		// console.log(this.model);
		// this.model.set("currentParagraphDefinition", e.model.id);
		this.model.save({
			currentParagraphDefinition: e.model.id
		});

		var record = new RecordTranslationView({
			vent: this.vent,
			template: $("#RecordTranslation-template").html(),
			model: e.model
		})
		.bind("successfull", this.onRecordingSent);
		this.activeView = record;
		this.render();
	},
	onRecordingSent: function() {
		var nextturn = new PlayingNextTurnView({
			vent: this.vent,
			template: $("#PlayingNextTurnView-template").html(),
		}).bind("next", this.onNextTurnFinished);

		this.activeView = nextturn;
		this.render();
	},
	onNextTurnFinished: function() {
		this.trigger("next");
	}
});