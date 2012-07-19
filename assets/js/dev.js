var MyApp = (function (Backbone, $, _, Handlebars) {
	
	// 	var Step_1_View = Backbone.View.extend({
	// 		tagName: "button",
	// 		className: "button btn-primary btn-large",
	// 		events: {
	// 			"click": "next"
	// 		},
	// 		initialize: function(options) {
	// 			this.el.innerText = "Step 1";
	// 			this.vent = options.vent;
	// 		},
	// 		next: function() {
	// 			this.vent.trigger("step1_finished");
	// 		}
	// 	});

	// 	var Step_2_View = Backbone.View.extend({
	// 		tagName: "button",
	// 		className: "button btn-info btn-large",
	// 		events: {
	// 			"click": "next"
	// 		},
	// 		initialize: function(options) {
	// 			this.el.innerText = "Step 2";
	// 			this.vent = options.vent;
	// 		},
	// 		next: function() {
	// 			this.vent.trigger("step2_finished");
	// 		}
	// 	});

	// 	var Step_3_View = Backbone.View.extend({
	// 		tagName: "button",
	// 		className: "button btn-success btn-large",
	// 		events: {
	// 			"click": "next"
	// 		},
	// 		initialize: function(options) {
	// 			this.el.innerText = "Step 3";
	// 			this.vent = options.vent;
	// 		},
	// 		next: function() {
	// 			this.vent.trigger("step3_finished");
	// 		}
	// 	});

	// var MainView = Backbone.View.extend({
	// 	step1_finished: function() {
	// 		console.log("step1_finished");
	// 		$(this.el).find("#view_area").html( this.view2.render().el );
	// 	},
	// 	step2_finished: function() {
	// 		console.log("step2_finished");
	// 		$(this.el).find("#view_area").html( this.view3.render().el );
	// 	},
	// 	step3_finished: function() {
	// 		console.log("step3_finished");
	// 	},
	// 	initialize: function(options) {
	// 		_.bindAll(this, 'step1_finished');
	// 		_.bindAll(this, 'step2_finished');
	// 		_.bindAll(this, 'step3_finished');
	// 		this.vent = options.vent || {};

	// 		this.view1 = new Step_1_View({
	// 			vent: this.vent
	// 		});

	// 		this.view2 = new Step_2_View({
	// 			vent: this.vent
	// 		});

	// 		this.view3 = new Step_3_View({
	// 			vent: this.vent
	// 		});

	// 		this.vent.on("step1_finished", this.step1_finished);
	// 		this.vent.on("step2_finished", this.step2_finished);
	// 		this.vent.on("step3_finished", this.step3_finished);

	// 		this.template = Handlebars.compile(options.template || "");
	// 		this.render();
	// 	},
	// 	render: function() {
	// 		$(this.el).append(this.template({heading: "testing a heading"}));
	// 		$(this.el).find("#view_area").html( this.view1.render().el );
	// 	},
	// });

	return {
		vent: _.extend({}, Backbone.Events),
		init: function() {
			var model1 = new Backbone.Model({
				id: 0,
				text: "Lorem ipsum dolor sit amet.",
				difficulty: 1
			});
			var model2 = new Backbone.Model({
				id: 1,
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				difficulty: 2
			});
			var model3 = new Backbone.Model({
				id: 2,
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed purus nulla.",
				difficulty: 3
			});

			var view = new ChooseQuestionView({
				model: model1,
				vent: this.vent
			});
			var collection = new Backbone.Collection([model1, model2, model3])
			var listView = new ChooseQuestionListView({
				collection: collection,
				vent: this.vent,
				el: $("#gaming")
			});

			this.vent.on("choose-answer", function (message) {
				console.log(message.toJSON());
			});

			listView.render();

			var audioPlayer = new SimpleAudioPlayerView({
				el: $(".audio-player"),
				model: new Backbone.Model({
					url: "http://dev.local:3000/game/recording/1337"
				})
			})
			.render();

			var audioRecorder = new SimpleAudioRecorderView({
				el: $(".audio-recorder"),
				model: new Backbone.Model({
					recordingUrl: "http://dev.local:3000/game/recording/1337",
					playingUrl: "http://dev.local:3000/game/recording/1337"
				})
			}).render();

		}
	}

})(Backbone, $, _, Handlebars);

$(document).ready(function(){
	MyApp.init();
});
