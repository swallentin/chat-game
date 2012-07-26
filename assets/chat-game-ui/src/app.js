var App = function () {
  var initialize = function () {
    var appRouter = new AppRouter();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
};