var Todo = Backbone.Model.extend({
	defaults: {
		"priority": 3
	},
	validate: function(attrs) {
		if(!attrs.title) {
			return "cannot have an empty title"
		}
	}
});