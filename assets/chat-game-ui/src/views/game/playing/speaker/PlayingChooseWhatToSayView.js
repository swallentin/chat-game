var PlayingChooseWhatToSay = Backbone.View.extend({
	tagName: "div",
	initialize: function (options) {
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);
		this.clickedQuestionEventName = options.clickedQuestionEventName || "/game/speaking/clickedAnswer";

		this.questionList = new ChooseQuestionListView({
			model: this.model,
			vent: this.vent,
			clickedQuestionEventName: this.clickedQuestionEventName
		})
		.bind("clickedQuestion", this.onClickedQuestion);
	},
	render: function () {

		$(this.el).append(this.template({
			message: "Choose what to say!"
		}));
		
		$(this.el).append(this.questionList.render().el);

		return this;
	},

	// event handlers
	onClickedQuestion: function(e) {
		console.log("PlayingChooseWhatToSay:onClickedQuestion");
		this.trigger("clickedQuestion", e);
	}
});