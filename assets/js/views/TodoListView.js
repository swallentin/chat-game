var TodoListView = Backbone.View.extend({
  tagName: "UL",
  className: "todos",
  initialize: function() {
    _.bindAll(this, "addTodo");
  },
  render: function() {
    this.collection.each(this.addTodo);
  },
  addTodo: function(todo) {
    var view = new TodoView({
      model: todo
    })
    var todoEl = view.render().el;
    $(this.el).append(todoEl);
  }
});