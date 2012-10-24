var App = function() {

    return {
      vent: _.extend({}, Backbone.Events),
      renderQuestionsView: function() {

        var view = new ChooseQuestionView({
          model: app.questions.get(0),
          vent: this.vent
        });

        var listView = new ChooseQuestionListView({
          collection: app.questions,
          vent: this.vent,
          el: $(".question-list")
        });

        this.vent.on("choose-answer", function(message) {
          console.log(message.toJSON());
        });

        $(".question").html(view.render().el);
        listView.render();
      },
      renderAudioPlayer: function() {
        var audioPlayer = new SimpleAudioPlayerView({
          el: $(".audio-player"),
          model: new Backbone.Model({
            url: "http://dev.local:3000/game/recording/1337"
          })
        }).render();
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
        var myGames = new Games({});
        myGames.fetch({
          success: function() {
            var gameListView = new GameListView({
              collection: myGames
            });
            $(".game-list").html(gameListView.render().el);
          }
        });


      },
      renderGameListItem: function() {
        var gameListItemView = new GameListItemView({
          model: app.games.get(1)
        });

        $(".game-list-item").html(gameListItemView.render().el);
      },
      test: function() {
        var i = 0;
        var view = new Backbone.View({
          el: $('testing'),
          collection: app.games,
          tagName: 'ul',
          className: 'test',
          render: function() {
            this.collection.each(this.add);
            return this;
          },
          add: function(item) {
            var itemView = new Backbone.View({
              tagName: 'li',
              render: function() {
                $(this.el).html("item:" + i++);
                return this;
              }
            });
            $(this.el).append(itemView.render().el);
          }
        }).render();
      },
      initialize: function() {
        this.renderQuestionsView();
        this.renderAudioRecorder();
        this.renderAudioPlayer();
        this.renderGameList();
        this.renderGameListItem();
        this.test();
      }
    };
  };

// // NOTE: Temporary data loading stuff
var app = App || {};

app.players = new Players();
app.players.push(new Player({
  id: 0,
  name: "chuckzo"
}));
app.players.push(new Player({
  id: 1,
  name: "johnzo"
}));

app.games = new Games();
app.games.push(new Game({
  id: 0,
  round: 2,
  score: 11,
  title: "Hello world",
  players: app.players,
  opponent: "test"
}));

app.games.push(new Game({
  id: 1,
  round: 4,
  score: 22,
  title: "lorem ipsum",
  players: app.players,
  opponent: "test"
}));

app.games.push(new Game({
  id: 2,
  round: 2,
  score: 11,
  title: "Having some codingliciuos funiosos",
  players: app.players,
  opponent: "test"
}));

app.questions = new Questions();
app.questions.push(new Question({
  id: 0,
  text: "Lorem ipsum dolor sit amet.",
  difficulty: 1
}));

app.questions.push(new Question({
  id: 1,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  difficulty: 2
}));

app.questions.push(new Question({
  id: 2,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed purus nulla.",
  difficulty: 3
}));