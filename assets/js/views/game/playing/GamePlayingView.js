var GamePlayingView = Backbone.View.extend({
	className: "playing",
	tagName: "div",
	initialize: function(options) {
		this.vent = options.vent || {};

		var me = new Backbone.Model({
			name: "My Name",
			imgUrl: "/img/profiles/c.jpg"
		});

		var game = new Backbone.Model({
      topic: {
        imgUrl: '/img/profiles/a.jpg',
        description: 'A topic',
      },
      playerA: {
        profileImgUrl: '/img/profiles/b.jpg'
      },
      playerB: {
        profileImgUrl: '/img/profiles/c.jpg'
      },
      score: 21
    });

		this.statusView = new GameStatusView({
			vent: this.vent,
			model: game,
			template: $("#GameStatusView-template").html()
		});

		this.actionView = new GameActionView({
			vent: this.vent,
			template: $("#GameActionView-template").html(),
			model: me
		});

	},
	render: function() {
		$(this.el).append(this.statusView.render().el);
		$(this.el).append(this.actionView.render().el);
		this.vent.trigger("/game/#:id/speaking");
		return this;
	}
});