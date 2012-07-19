var ChooseQuestionView = Backbone.View.extend({
	tagName: "button",
	className: "btn btn-large btn-primary choose-answer",
	type: "button",
  events: {
    "click": "onClickedQuestion"
  },
	initialize: function (options) {
		this.vent = options.vent || {};
		_.bindAll(this);
	
		if(this.model.get("difficulty")) {
			this.ratingView = new RatingView({
				level: this.model.get("difficulty"),
				vent: this.vent
			});
		}

	},
	render: function () {
		$(this.el).html(this.model.get("text"));

		if(this.model.get("difficulty")) {
			$(this.el).append(this.ratingView.render().el);
		}

		return this;
	},

	// Events handlers

	onClickedQuestion: function () {
		var eventMessage = {
			view: this,
			model: this.model
		};
		console.log("ChooseQuestionView:onClickedQuestion");

		this.trigger("clickedQuestion", eventMessage );
	}

})


