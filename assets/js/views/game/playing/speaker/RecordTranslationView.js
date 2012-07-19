var RecordTranslationView = Backbone.View.extend({
	className: "record",
	initialize: function (options) {
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		this.questionView = new ChooseQuestionView({
			model: this.model,
			vent: options.vent
		});

		_.bindAll(this);

		this.on("/game/#id/recording_succesful", this.success);
		this.on("/game/#id/recording_failed", this.failed);
		this.recorder = new SimpleAudioRecorderView({
			model: new Backbone.Model({
				recordingUrl: "http://dev.local:3000/game/recording/1337",
				playingUrl: "http://dev.local:3000/game/recording/1337"
			})
		});

	},
	events: {
		"click .btn.btn-record": "record",
		"click .btn.btn-send-recording": "next"
	},
	render: function() {
		$(this.el).append(this.questionView.render().el);
		$(this.el).append(this.template({
			instruction: "Translate to English, and record your translation!"
		}));
		$(this.el).append(this.recorder.render().el);
		return this;	
	},
	record: function() {
		// do record logic
		console.log("doing record");
		var that = this;
		setTimeout(function() {
			that.trigger("/game/#id/recording_succesful");
		}, 500)
	},
	hide: function() {
		$(this.el).find(".alert.alert-error").hide();
		$(this.el).find(".btn.btn-send-recording").hide();
	},
	success: function() {
		$(this.el).find(".alert.alert-error").hide();
		$(this.el).find(".btn.btn-send-recording").show();
	},
	failed: function() {
		$(this.el).find(".alert.alert-error").show();
		$(this.el).find(".btn.btn-send-recording").hide();
	},
	next: function () {
		this.trigger("successfull");
	}
});