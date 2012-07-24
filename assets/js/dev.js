var MyApp = (function (Backbone, $, _, Handlebars) {
	return {
		vent: _.extend({}, Backbone.Events),
		renderQuestionsView: function() {
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
				el: $(".sentance-list")
			});

			this.vent.on("choose-answer", function (message) {
				console.log(message.toJSON());
			});

			listView.render();
		},
		renderAudioPlayer: function() {
			var audioPlayer = new SimpleAudioPlayerView({
				el: $(".audio-player"),
				model: new Backbone.Model({
					url: "http://dev.local:3000/game/recording/1337"
				})
			})
			.render();
		},
		renderAudioRecorder: function() {
			var audioRecorder = new SimpleAudioRecorderView({
				el: $(".audio-recorder"),
				model: new Backbone.Model({
					recordingUrl: "http://dev.local:3000/game/recording/1337",
					playingUrl: "http://dev.local:3000/game/recording/1337"
				})
			}).render();
		},
		renderGameList: function() {
		var player1 = new Backbone.Model({
				id: 0,
				name: "chuckzo"
			});

			var player2 = new Backbone.Model({
				id: 1,
				name: "johnzo"
			});

			var game1 = new Backbone.Model({
				id: 0,
				round: 2,
				score: 11,
				title: "Hello world",
				players: new Backbone.Collection(),
				opponent: "test"
			});
			var game2 = new Backbone.Model({
				id: 1,
				round: 5,
				score: 15,
				title: "Hello world 2",
				players: new Backbone.Collection(),
				opponent: "test2"
			});

			game1.get('players').add([player1, player2]);
			game2.get('players').add([player1, player2]);

			var games = new Backbone.Collection([game1, game2]);

			var gameListView = new GameListView({
				collection: games
			});

			$(".game-list").html( gameListView.render().el );

		},
		renderGameListItem: function() {
		var player1 = new Backbone.Model({
				id: 0,
				name: "chuckzo"
			});

			var player2 = new Backbone.Model({
				id: 1,
				name: "johnzo"
			});

			var game1 = new Backbone.Model({
				id: 0,
				round: 2,
				score: 11,
				title: "Hello world",
				players: new Backbone.Collection(),
				opponent: "test"
			});

			game1.get('players').add([player1, player2]);

			var games = new Backbone.Collection([game1]);

			var gameListItemView = new GameListItemView({
				model: game1
			});

			$(".game-list-item").html(gameListItemView.render().el);
		},
		init: function() {
			// this.renderQuestionsView();
			// this.renderAudioRecorder();
			// this.renderAudioPlayer();
			this.renderGameList();
			this.renderGameListItem();
		}
	}

})(Backbone, $, _, Handlebars);

$(document).ready(function(){
	MyApp.init();
});
