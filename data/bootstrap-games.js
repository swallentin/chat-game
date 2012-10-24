var mongoose = require('mongoose'),
  models = require('../lib/models'),
  config = require('../config');
  Game = mongoose.model('Game'),


mongoose.connect(config.mongodb);

var game = new Game({
  name: 'Game A',
  player_a: '5056f7e3d89068863d000001',
  player_b: '5056f7e3d89068863d000002',
  dialogue: '505bea111586071e75000001',
  currentParagraph: '505aeb403b152e9d5b000004',
  currentParagraphDefinition: '505aeb403b152e9d5b000002'
});

var game2 = new Game({
  name: 'Game B',
  player_a: '5056f7e3d89068863d000001',
  player_b: '5056f7e3d89068863d000002',
  dialogue: '505bea75497d6d8675000001',
  currentParagraph: '505aeb403b152e9d5b000004',
  currentParagraphDefinition: '505aeb403b152e9d5b000002'
});

game.save(function(err, doc) {
  game2.save(function(err, doc) {
    mongoose.disconnect();
    console.log('finished');
  });
});