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
$(document).ready(function() {
	var app = new App();
	app.initialize();
});

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
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "games/:id": "games",
  },
  index: function() {
    console.log("index");
  },
  games: function(id) {
    console.log("games/" + id);
  }
});
var GameView = Backbone.View.extend({
  tagName: "div",
  id: "game-view",
  render: function () {
    return this;
  }
});
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
var TodoView = Backbone.View.extend({
  tagName: "li",
  initialize: function(options) {
    _.bindAll(this, "edit");
    this.template = Handlebars.compile(options.template || "");
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  events: {
    "click a.edit": "edit"
  },
  edit: function() {
    this.$("h2").fadeOut();
    this.$("input.edit").fadeIn();
  }
});
// added a comment
var GameStateView = Backbone.View.extend({
	className: "game-state-info btn-inverse",
	initialize: function(options) {
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});














