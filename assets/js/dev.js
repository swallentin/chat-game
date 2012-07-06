var MyApp = (function (Backbone, $, _, Handlebars) {
	
		var Step_1_View = Backbone.View.extend({
			tagName: "button",
			className: "button btn-primary btn-large",
			events: {
				"click": "next"
			},
			initialize: function(options) {
				this.el.innerText = "Step 1";
				this.vent = options.vent;
			},
			next: function() {
				this.vent.trigger("step1_finished");
			}
		});

		var Step_2_View = Backbone.View.extend({
			tagName: "button",
			className: "button btn-info btn-large",
			events: {
				"click": "next"
			},
			initialize: function(options) {
				this.el.innerText = "Step 2";
				this.vent = options.vent;
			},
			next: function() {
				this.vent.trigger("step2_finished");
			}
		});

		var Step_3_View = Backbone.View.extend({
			tagName: "button",
			className: "button btn-success btn-large",
			events: {
				"click": "next"
			},
			initialize: function(options) {
				this.el.innerText = "Step 3";
				this.vent = options.vent;
			},
			next: function() {
				this.vent.trigger("step3_finished");
			}
		});

	var MainView = Backbone.View.extend({
		step1_finished: function() {
			console.log("step1_finished");
			$(this.el).find("#view_area").html( this.view2.render().el );
		},
		step2_finished: function() {
			console.log("step2_finished");
			$(this.el).find("#view_area").html( this.view3.render().el );
		},
		step3_finished: function() {
			console.log("step3_finished");
		},
		initialize: function(options) {
			_.bindAll(this, 'step1_finished');
			_.bindAll(this, 'step2_finished');
			_.bindAll(this, 'step3_finished');
			this.vent = options.vent || {};

			this.view1 = new Step_1_View({
				vent: this.vent
			});

			this.view2 = new Step_2_View({
				vent: this.vent
			});

			this.view3 = new Step_3_View({
				vent: this.vent
			});

			this.vent.on("step1_finished", this.step1_finished);
			this.vent.on("step2_finished", this.step2_finished);
			this.vent.on("step3_finished", this.step3_finished);

			this.template = Handlebars.compile(options.template || "");
			this.render();
		},
		render: function() {
			$(this.el).append(this.template({heading: "testing a heading"}));
			$(this.el).find("#view_area").html( this.view1.render().el );
		},
	});

	return {
		vent: _.extend({}, Backbone.Events),
		init: function() {
			var mainView = new MainView({
				el: $("#meme"),
				template: $("#mainview").html(),
				vent: this.vent
			});

			// $("#meme").html( view.render().el );
		}
	}

})(Backbone, $, _, Handlebars);




$(document).ready(function(){
	MyApp.init();
});
