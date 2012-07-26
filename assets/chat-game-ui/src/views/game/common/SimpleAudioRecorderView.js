var SimpleAudioRecorderView = Backbone.View.extend({
	className: "recorder well",
	events: {
		"click .btn-record": "record",
		"click .btn-stoprecord": "stop"
	},
	initialize: function() {
		_.bindAll(this);

		this.template = Handlebars.compile($("#SimpleAudioRecorderView-template").html());

		this.on("setupAudio", this.onSetupAudio);
		this.on("record", this.onRecord);
		this.on("stop", this.onStop);
	},
	render: function() {
		this.setupAudio();
		return this;
	},
	renderAudioController: function() {
		console.log("SimpleAudioRecorderView:renderAudioController");
		$(this.el).html(this.template())
	},
	setupAudio: function() {
		console.log("SimpleAudioRecorderView:setupAudio");
		this.trigger("setupAudio");
	},
	record: function() {
		console.log("SimpleAudioRecorderView:record");
		this.trigger("record");
	},
	stop: function() {
		console.log("stop");
		this.trigger("stop");
	},
	onRecord: function() {
		console.log("SimpleAudioRecorderView:onPlay");
		Wami.startRecording(this.model.get("recordingUrl"));
	},
	onStop: function() {
		console.log("SimpleAudioRecorderView:onStop");
		Wami.stopRecording();
	},
	onSetupAudio: function() {
		console.log("SimpleAudioRecorderView:onSetupAudio");
		$(this.el).html("Setting up audio control.");
		var fn = this.onSetupAudioFinished;
		Wami.setup({
			id: "wami",
			onLoaded: this.onSetupAudioFinished
		});
	},
	onSetupAudioFinished: function() {
		console.log("SimpleAudioRecorderView:onSetupAudioFinished");
		this.renderAudioController();
	}
});