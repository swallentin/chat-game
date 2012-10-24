var ChooseRightAnswerView = Backbone.View.extend({
	initialize: function (options) {

		// handle all options 
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);

		// event binding, init stuff
		this.on("clickedCorrectAnswer", this.onCorrectAnswer);
		this.on("clickedWrongAnswer", this.onWrongAnswer);
		this.on("render", this.onRender);

		// game state
		this.correctAnswerId = 1;

		// setup views
		this.questionList = new ChooseQuestionListView({
			collection: this.model.get("questions"),
			vent: this.vent
		})
		.bind('clickedQuestion', this.onClickedQuestion);

		this.audioPlayer = new SimpleAudioPlayerView({
			model: new Backbone.Model({
				url: "http://dev.local:3000/game/recording/1337"
			})
		});

	},
	render: function() {
		console.log("ChooseRightAnswerView:render");
		$(this.el).html( this.template({message: "What is Samsan saying?"}) );
		$(this.el).append( this.audioPlayer.render().el );
		$(this.el).append( this.questionList.render().el );

		this.trigger("render");
		return this;
	},
	renderResponseView: function() {
		this.answerView.bind("next",this.onNext);
		$(this.el).append(this.answerView.render().el);
	},
	// Events
	isCorrectAnswer: function(model) {
		return this.correctAnswerId == model.id;
	},
	onClickedQuestion: function(data) {
		console.log("ChooseRightAnswerView:onClickedQuestion");
		
		// .unsubscribe()
		// unsubscribe from event, to prevent multiple calls
		this.questionList.off("clickedQuestion", this.onClickedQuestion);

		var answerIsCorrect = this.isCorrectAnswer(data.model);

		// update  UI
		var isCorrectAnswerStyle = answerIsCorrect ? 
			"btn-success btn-iscorrect":
			"btn-danger btn-iswrong";

		$(data.view.el).removeClass("btn-primary");
		$(data.view.el).addClass(isCorrectAnswerStyle);
		$(data.view.el).addClass("active");

		// trigger ui notification
			
		var eventToTrigger = answerIsCorrect ? 
			"clickedCorrectAnswer":
			"clickedWrongAnswer";

		// chain this event
		this.trigger(eventToTrigger);
	},
	onCorrectAnswer: function() {
		this.answerView = new AnswerView({
			vent: this.vent,
			message: "Correct!"
		});
		this.renderResponseView();
	},
	onWrongAnswer: function() {
		this.answerView = new AnswerView({
			vent: this.vent,
			message: "Wrong!"
		});
		this.renderResponseView();
	},
	onNext: function() {
		this.trigger("next");
	}
});