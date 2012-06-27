var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "todo/:id": "todo",
  },
  index: function() {
    this.todos = new Todos();
    this.todosView = new TodoListView({
      collection: this.todos
    });
    this.todos.fetch();
  },
  todo: function(id) {}
});