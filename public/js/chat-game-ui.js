var Game = Backbone.Model.extend({
	idAttribute: "_id"
});

var Games = Backbone.Collection.extend({
  model: Game
});
var Questions = Backbone.Model.extend({
  model: Game
});
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
  vent: _.extend({}, Backbone.Events),
  routes: {
    "": "index",
    "game/:id": "game",
  },
  index: function() {
    console.log("index");
  },
  game: function(id) {
    console.log("game/" + id);
    // var game = new Game({
    //   id: id
    // });

    var gameView = new GameView({
      el: $("#game"),
      vent: this.vent
    });
    gameView.render();
  }
});
var ChooseQuestionListView = Backbone.View.extend({
	initialize: function (options) {
		this.vent = options.vent || {};
    this.clickQuestionEventName = options.clickQuestionEventName || "clickedQuestion";
    _.bindAll(this);
	},
	render: function() {
    this.collection.each(this.addQuestion);
    return this;
	},
	addQuestion: function(question) {
    var view = new ChooseQuestionView({
      model: question,
      vent: this.vent,
      clickQuestionEventName: this.clickQuestionEventName
    })
    .bind("clickedQuestion", this.onClickQuestion);
    var questionEl = view.render().el;
    $(this.el).append(questionEl);
	},

  // event handlers
  onClickQuestion: function(e) {
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
		console.log("ChooseQuestionView:onClickedQuestion");

		this.trigger("clickedQuestion", eventMessage );
	}

})



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
			vent: this.vent
		});
	},
  render: function () {
  	$(this.el).html(this.playingView.render().el);
    return this;
  }
});
var GameListItemView = Backbone.View.extend({
  className: 'item game-list-item',
  tagName: 'LI',
  initialize: function() {
    this.template = Handlebars.compile( $("#GameListItemView-template").html() );
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
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

		var collection = new Backbone.Collection([model1, model2, model3]);

		this.game = new Backbone.Model({
			questions: collection
		});

	},
	onLoad: function() {
	},
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	renderActiveView: function() {
		$(this.el).find("#content").html(this.activeView.render().el);
	},
	renderListening: function() {
		console.log("GameActionView:renderListening")
		this.activeView = new PlayingListeningView({
			vent: this.vent,
			model: this.game
		})
		.bind("next", this.onFinishedListening );
		this.renderActiveView();
	},
	renderSpeaking: function() {
		console.log("GameActionView:renderSpeaking")
		this.activeView = new PlayingSpeakingView({
			vent: this.vent,
			model: this.game
		})
		.bind("next", this.onFinishedSpeaking );;
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
	initialize: function (options) {
		this.vent = options.vent || {};
	}
});
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
			collection: this.model.get("questions"),
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
		this.views = [];

		this.on("onload", this.onLoad);
		this.trigger("onload");

	},
	render: function() {
		$(this.el).html(this.activeView.render().el);
		return this;
	},
	onLoad: function() {
		var choose = new PlayingChooseWhatToSay({
			vent: this.vent,
			template: $("#PlayingChooseWhatToSay-template").html(),
			model: this.model
		})
		.bind("clickedQuestion", this.onClickedQuestion);
		this.activeView = choose;
	},
	// Events
	onClickedQuestion: function(e) {
		console.log("PlayingSpeakingView:onClickedQuestion");

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
		})
		.bind("next", this.onNextTurnFinished);
		
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
var App = function () {
  var initialize = function () {
    var appRouter = new AppRouter();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
};
$(document).ready(function() {

  App().initialize();

  console.log('testing');
});
var MyApp = (function (Backbone, $, _, Handlebars) {
  console.log("My App");
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
