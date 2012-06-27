var Todos = Backbone.Collection.extend({
  url: "/todos",
  model: Todo,
  parse: function(res) {
    return res.response.todos;
  },
  comparator: function (todo) {
    return todo.get("priority");
  }
});