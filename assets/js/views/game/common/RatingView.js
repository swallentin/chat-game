var RatingView = Backbone.View.extend({
	className: "rating-container",
	initialize: function (options) {
		this.level = options.level || 0;
	},
	render: function() {
		var currentLevel = 0;
		for (; currentLevel < this.level; currentLevel++) {
			$(this.el).append('<i class="icon-star icon-yellow"></i>');
		};
		return this;
	}
});