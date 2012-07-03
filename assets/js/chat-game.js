// var connection=null;
// $(document).ready(function(){
    
//     // $('#setup-twilio').click(function() {

//         $.getJSON('/api/token', { clientName: $("#name").val() }, function(data) {
//             // $(".debug-message-window").append(data);
//             // console.log(data);
        
//             Twilio.Device.setup(data.token,{"debug":true});

//             $("#call").click(function() {
//                 Twilio.Device.connect();
//             });

//             $("#hangup").click(function() {  
//                 connection.sendDigits("#");
//             });
         
//             Twilio.Device.ready(function (device) {
//                 $('#status').text('Ready to start recording');
//             });
         
//             Twilio.Device.offline(function (device) {
//                 $('#status').text('Offline');
//             });
         
//             Twilio.Device.error(function (error) {
//                 $('#status').text(error);
//             });
         
//             Twilio.Device.connect(function (conn) {
//                 console.log('Connect()');
//                 connection=conn;
//                 $('#status').text("On Air");
//                 $('#status').css('color', 'red');
//                 toggleCallStatus();
//             });
         
//             Twilio.Device.disconnect(function (conn) {
//                 $('#status').html('Recording ended<br/><a href="recordings/show">view recording list</a>');
//                 $('#status').css('color', 'black');
//                 toggleCallStatus();
//             });
//         });
//     // });
// });

// function toggleCallStatus(){
//     $('#call').toggle();
//     $('#hangup').toggle();
// }
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
var GameView = Backbone.View.extend({
  tagName: "div",
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