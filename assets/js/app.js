var App = function() {
	var initialize = function() {
		console.log("initialize");
		var appRouter = new AppRouter();
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};
};