var ChooseQuestionListView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
    this.clickQuestionEventName = options.clickQuestionEventName || "clickedQuestion";
    _.bindAll(this);
	},
	render: function() {
    this.collection.each(this.addQuestion);
    return this;
	},
	addQuestion: function(question) {
    var view = new ChooseQuestionView({
      model: question,
      vent: this.vent,
      clickQuestionEventName: this.clickQuestionEventName
    })
    .bind("clickedQuestion", this.onClickQuestion);
    var questionEl = view.render().el;
    $(this.el).append(questionEl);
	},

  // event handlers
  onClickQuestion: function(e) {
    this.trigger("clickedQuestion", e);
  }
});