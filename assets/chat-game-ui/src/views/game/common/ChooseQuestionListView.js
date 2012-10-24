var ChooseQuestionListView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
    this.clickQuestionEventName = options.clickQuestionEventName || "clickedQuestion";
    _.bindAll(this);
	},
	render: function() {
    
    var questions = new Questions({}),
        that = this;
    
    questions.fetch({
      url: '/paragraphs/' + that.model.get('currentParagraph')._id,
      success: function() {
        questions.each(that.addQuestion);
      }
    });

    return this;
	},
	addQuestion: function(question) {
    var view = new ChooseQuestionView({
      model: question,
      vent: this.vent,
      clickQuestionEventName: this.clickQuestionEventName
    })
    .bind("clickedQuestion", this.onClickQuestion);


    $(this.el).append(view.render().el);
	},

  // event handlers
  onClickQuestion: function(e) {
    console.log('ChooseQuestionListView:onClickQuestion');
    this.trigger("clickedQuestion", e);
  }
});