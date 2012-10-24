var Game = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/games'
});
var Question = Backbone.Model.extend({
});
var Player = Backbone.Model.extend({
  urlRoot: '/users'
});
var Games = Backbone.Collection.extend({
  url: '/games',
  model: Game
});
var Players = Backbone.Collection.extend({
  model: Player
});
var Questions = Backbone.Collection.extend({
  model: Question,
  url: function() {
    return function() {
      console.log(this.urlRoot + this.get('id'));
      return this.urlRoot + this.get('id');
    };
  },
  parse: function(res) {
    return res.alternatives;
  }
});
var AppRouter = Backbone.Router.extend({
  vent: _.extend({}, Backbone.Events),
  routes: {
    // TODO: index should games-list
    "game/:id": "game",
    "": "index"
  },
  index: function() {
    var myGames = new Games();
    myGames.fetch({
      success: function() {
        var gameListView = new GameListView({
          collection: myGames
        });
        $("#game").html(gameListView.render().el);
      }
    });

  },
  game: function(id) {
    var that = this;
    var game = new Game({
      _id: id
    });
    game.fetch({
      success: function(model, response) {
        var gameView = new GameView({
          el: $("#game"),
          vent: that.vent,
          model: model
        });
        $("#game").html(gameView.render().el);
      }
    });
  }
});
var ChooseQuestionListView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
    this.clickQuestionEventName = options.clickQuestionEventName || "clickedQuestion";
    _.bindAll(this);
	},
	render: function() {
    
    var questions = new Questions({}),
        that = this;
    
    questions.fetch({
      url: '/paragraphs/' + that.model.get('currentParagraph')._id,
      success: function() {
        questions.each(that.addQuestion);
      }
    });

    return this;
	},
	addQuestion: function(question) {
    var view = new ChooseQuestionView({
      model: question,
      vent: this.vent,
      clickQuestionEventName: this.clickQuestionEventName
    })
    .bind("clickedQuestion", this.onClickQuestion);


    $(this.el).append(view.render().el);
	},

  // event handlers
  onClickQuestion: function(e) {
    console.log('ChooseQuestionListView:onClickQuestion');
    this.trigger("clickedQuestion", e);
  }
});
var ChooseQuestionView = Backbone.View.extend({
	tagName: "button",
	className: "btn btn-large btn-primary choose-answer",
	type: "button",
  events: {
    "click": "onClickedQuestion"
  },
	initialize: function (options) {
		this.vent = options.vent || {};
		_.bindAll(this);
	
		if(this.model.get("difficulty")) {
			this.ratingView = new RatingView({
				level: this.model.get("difficulty"),
				vent: this.vent
			});
		}

	},
	render: function () {
		$(this.el).html(this.model.get("text"));

		if(this.model.get("difficulty")) {
			$(this.el).append(this.ratingView.render().el);
		}

		return this;
	},

	// Events handlers

	onClickedQuestion: function () {
		var eventMessage = {
			view: this,
			model: this.model
		};

		this.trigger("clickedQuestion", eventMessage );
	}

});



var RatingView = Backbone.View.extend({
	className: "rating-container",
	initialize: function (options) {
		this.level = options.level || 0;
	},
	render: function() {
		var currentLevel = 0;
		for (; currentLevel < this.level; currentLevel++) {
			$(this.el).append('<i class="icon-star icon-yellow"></i>');
		};
		return this;
	}
});
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
var GameView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
		this.playingView = new GamePlayingView({
			vent: this.vent,
      model: this.model
		});
	},
  render: function () {
    return this.playingView.render();
  }
});
var GameListItemView = Backbone.View.extend({
  tagName: "LI",
  className: "item game-list-item",
  initialize: function() {
    this.template = Handlebars.compile( $("#GameListItemView-template").html() );
  },
  render: function() {
    var output = this.template(this.model.toJSON());
    $(this.el).html(output);
    return this;
  }
});
var GameListView = Backbone.View.extend({
  className: "game-list",
  tagName: "UL",
	initialize: function (options) {
		this.vent = options.vent || {};
    _.bindAll(this);
	},
	render: function() {
    this.collection.each(this.addItem);
		return this;
	},
  addItem: function(game) {
    // console.log(game);
    var view = new GameListItemView({
      model: game
    });
    var gameEl = view.render().el;
    $(this.el).append(gameEl);
  }
});
var GameNotPlayingView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
	}
});
var StartGameView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
	}
});
var GameActionView = Backbone.View.extend({
	tagName: "div",
	className: "action quotes",
	initialize: function(options) {

		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");

		// event binding
		_.bindAll(this);

		this.on("load", this.onLoad);

		this.vent.on("/game/#:id/listening", this.renderListening);
		this.vent.on("/game/#:id/speaking", this.renderSpeaking);

	},
	onLoad: function() {},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	renderActiveView: function() {
		$(this.el).find("#content").html(this.activeView.render().el);
	},
	renderListening: function() {
		console.log("GameActionView:renderListening");
		this.activeView = new PlayingListeningView({
			vent: this.vent,
			model: this.model
		}).bind("next", this.onFinishedListening);
		this.renderActiveView();
	},
	renderSpeaking: function() {
		console.log("GameActionView:renderSpeaking");
		this.activeView = new PlayingSpeakingView({
			vent: this.vent,
			model: this.model
		}).bind("next", this.onFinishedSpeaking);
		this.renderActiveView();
	},
	onFinishedListening: function() {
		this.vent.trigger("/game/#:id/speaking");
	},
	onFinishedSpeaking: function() {
		this.vent.trigger("/game/#:id/listening");
	}
});
var GameOverView = Backbone.View.extend({
  className: "game-over",
  initialize: function(options) {
    this.vent = options.vent || {};
  }
});
var GamePlayingView = Backbone.View.extend({
	className: "playing",
	tagName: "div",
	initialize: function(options) {
		this.vent = options.vent || {};
    var self = this;

		this.statusView = new GameStatusView({
			vent: this.vent,
			model: self.model,
			template: $("#GameStatusView-template").html()
		});

		this.actionView = new GameActionView({
			vent: this.vent,
			template: $("#GameActionView-template").html(),
			model: self.model
		});

	},
	render: function() {
		$(this.el).append(this.statusView.render().el);
		$(this.el).append(this.actionView.render().el);
		this.vent.trigger("/game/#:id/speaking");
		return this;
	}
});
var GameStatusView = Backbone.View.extend({
	className: "game-state-info btn-inverse",
	initialize: function(options) {
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
var AnswerView = Backbone.View.extend({
	events: {
		"click .btn-next": "onClickedNext" 
	},
	initialize: function(options) {
		this.message = options.message || "No message provided.";
		this.template = Handlebars.compile( $("#AnswerView-template").html() ),
		this.vent = options.vent || {};
		_.bindAll(this);
	},
	render: function() {
		$(this.el).html(this.template({
			message: this.message
		}));
		return this;
	},
	onClickedNext: function() {
		this.trigger("next");
	}
});


var ChooseRightAnswerView = Backbone.View.extend({
	initialize: function (options) {

		// handle all options 
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);

		// event binding, init stuff
		this.on("clickedCorrectAnswer", this.onCorrectAnswer);
		this.on("clickedWrongAnswer", this.onWrongAnswer);
		this.on("render", this.onRender);

		// game state
		this.correctAnswerId = 1;

		// setup views
		this.questionList = new ChooseQuestionListView({
			collection: this.model.get("questions"),
			vent: this.vent
		})
		.bind('clickedQuestion', this.onClickedQuestion);

		this.audioPlayer = new SimpleAudioPlayerView({
			model: new Backbone.Model({
				url: "http://dev.local:3000/game/recording/1337"
			})
		});

	},
	render: function() {
		console.log("ChooseRightAnswerView:render");
		$(this.el).html( this.template({message: "What is Samsan saying?"}) );
		$(this.el).append( this.audioPlayer.render().el );
		$(this.el).append( this.questionList.render().el );

		this.trigger("render");
		return this;
	},
	renderResponseView: function() {
		this.answerView.bind("next",this.onNext);
		$(this.el).append(this.answerView.render().el);
	},
	// Events
	isCorrectAnswer: function(model) {
		return this.correctAnswerId == model.id;
	},
	onClickedQuestion: function(data) {
		console.log("ChooseRightAnswerView:onClickedQuestion");
		
		// .unsubscribe()
		// unsubscribe from event, to prevent multiple calls
		this.questionList.off("clickedQuestion", this.onClickedQuestion);

		var answerIsCorrect = this.isCorrectAnswer(data.model);

		// update  UI
		var isCorrectAnswerStyle = answerIsCorrect ? 
			"btn-success btn-iscorrect":
			"btn-danger btn-iswrong";

		$(data.view.el).removeClass("btn-primary");
		$(data.view.el).addClass(isCorrectAnswerStyle);
		$(data.view.el).addClass("active");

		// trigger ui notification
			
		var eventToTrigger = answerIsCorrect ? 
			"clickedCorrectAnswer":
			"clickedWrongAnswer";

		// chain this event
		this.trigger(eventToTrigger);
	},
	onCorrectAnswer: function() {
		this.answerView = new AnswerView({
			vent: this.vent,
			message: "Correct!"
		});
		this.renderResponseView();
	},
	onWrongAnswer: function() {
		this.answerView = new AnswerView({
			vent: this.vent,
			message: "Wrong!"
		});
		this.renderResponseView();
	},
	onNext: function() {
		this.trigger("next");
	}
});
var PlayingListeningView = Backbone.View.extend({
	className: "listening",
	initialize: function (options) {
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);

		this.activeView = new ChooseRightAnswerView({
			el: $(this.el),
			vent: this.vent,
			template: $("#ChooseRightAnswerView-template").html(),
			model: this.model
		}).bind("next", this.onNext);

	},  
	render: function() {
		this.activeView.render();
		return this;
	},
	onNext: function() {
		this.trigger("next");
	}
});
var YourTurnView = Backbone.View.extend({
	className: "next-turn",
	initialize: function (options) {
		this.vent = options.vent;
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template({
			message: "It's your turn now."
		}));
		return this;
	}
});
var PlayingChooseWhatToSay = Backbone.View.extend({
	tagName: "div",
	initialize: function (options) {
		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");
		_.bindAll(this);
		this.clickedQuestionEventName = options.clickedQuestionEventName || "/game/speaking/clickedAnswer";

		this.questionList = new ChooseQuestionListView({
			model: this.model,
			vent: this.vent,
			clickedQuestionEventName: this.clickedQuestionEventName
		})
		.bind("clickedQuestion", this.onClickedQuestion);
	},
	render: function () {

		$(this.el).append(this.template({
			message: "Choose what to say!"
		}));
		
		$(this.el).append(this.questionList.render().el);

		return this;
	},

	// event handlers
	onClickedQuestion: function(e) {
		console.log("PlayingChooseWhatToSay:onClickedQuestion");
		this.trigger("clickedQuestion", e);
	}
});
var PlayingNextTurnView = Backbone.View.extend({
	className: "next-turn",
	initialize: function (options) {
		this.vent = options.vent;
		this.template = Handlebars.compile(options.template || "");
	},
	render: function() {
		$(this.el).html(this.template({
			message: "Waiting for other party to reply"
		}));

		var that = this;
		setTimeout(function() {
			that.trigger("next");
		}, 2000);
		return this;
	}
});
var PlayingSpeakingView = Backbone.View.extend({
	// Element settings
	// View initialization and render
	initialize: function(options) {

		this.vent = options.vent || {};
		this.template = Handlebars.compile(options.template || "");

		// setup event stuff
		_.bindAll(this);

		this.on("onload", this.onLoad);
		this.trigger("onload");

	},
	render: function() {
		$(this.el).html(this.activeView.render().el);
		return this;
	},
	onLoad: function() {
		// TODO: Insert get paragraph options here
		var choose = new PlayingChooseWhatToSay({
			vent: this.vent,
			template: $("#PlayingChooseWhatToSay-template").html(),
			model: this.model
		}).bind("clickedQuestion", this.onClickedQuestion);
		this.activeView = choose;
	},

	// Events
	onClickedQuestion: function(e) {
		console.log("PlayingSpeakingView:onClickedQuestion");

		// post the selected paragraph to the api

		// console.log(this.model);
		// this.model.set("currentParagraphDefinition", e.model.id);
		this.model.save({
			currentParagraphDefinition: e.model.id
		});

		var record = new RecordTranslationView({
			vent: this.vent,
			template: $("#RecordTranslation-template").html(),
			model: e.model
		})
		.bind("successfull", this.onRecordingSent);
		this.activeView = record;
		this.render();
	},
	onRecordingSent: function() {
		var nextturn = new PlayingNextTurnView({
			vent: this.vent,
			template: $("#PlayingNextTurnView-template").html(),
		}).bind("next", this.onNextTurnFinished);

		this.activeView = nextturn;
		this.render();
	},
	onNextTurnFinished: function() {
		this.trigger("next");
	}
});
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
Backbone.Model.prototype.idAttribute = "_id";

$(document).ready(function() {
  App().initialize();
});

