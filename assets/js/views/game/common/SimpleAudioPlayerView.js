var SimpleAudioPlayerView = Backbone.View.extend({
	className: "well player",
	events: {
		"click .btn-play": "play",
		"click .btn-stop": "stop"
	},
	initialize: function() {
		_.bindAll(this);

		this.template = Handlebars.compile($("#SimpleAudioPlayerView-template").html());

		this.on("setupAudio", this.onSetupAudio);
		this.on("play", this.onPlay);
		this.on("stop", this.onStop);
	},
	render: function() {
		this.setupAudio();
		return this;
	},
	renderAudioController: function() {
		console.log("SimpleAudioPlayer:renderAudioController");
		$(this.el).html(this.template())
	},
	setupAudio: function() {
		console.log("SimpleAudioPlayer:setupAudio");
		this.trigger("setupAudio");
	},
	play: function() {
		console.log("play");
		this.trigger("play");
	},
	stop: function() {
		console.log("stop");
		this.trigger("stop");
	},
	onPlay: function() {
		console.log("SimpleAudioPlayer:onPlay");
		Wami.startPlaying(this.model.get("url"));
	},
	onStop: function() {
		console.log("SimpleAudioPlayer:onStop");
		Wami.stopPlaying();
	},
	onSetupAudio: function() {
		console.log("SimpleAudioPlayer:onSetupAudio");
		$(this.el).html("Setting up audio control.");
		var fn = this.onSetupAudioFinished;
		Wami.setup({
			id: "wami",
			onLoaded: this.onSetupAudioFinished
		});
	},
	onSetupAudioFinished: function() {
		console.log("SimpleAudioPlayer:onSetupAudioFinished");
		this.renderAudioController();
	}
});