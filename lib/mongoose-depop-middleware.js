var models = require('./models'),
  mongoose = require('mongoose'),
  game = mongoose.model('Game');

var object = {
  _id: '505c15675841b77da3000001',
  player_a: {
    name: 'User A',
    _id: '5056f7e3d89068863d000001',
    icon: 'a.jpg',
    __v: 0,
    games: []
  },
  player_b: {
    name: 'User BA',
    _id: '5056f7e3d89068863d000002',
    icon: 'b.jpg',
    __v: 0,
    games: []
  },
  dialogue: {
    icon: 'learning.png',
    _id: '505bea111586071e75000001',
    topic: 'Learning to hold a dialogue!',
    __v: 0,
    paragraphs: ['505aeb403b152e9d5b000004', '505be63e51b843c172000004']
  },
  currentParagraph: {
    _id: '505aeb403b152e9d5b000004',
    __v: 0,
    alternatives: ['505aeb403b152e9d5b000001', '505aeb403b152e9d5b000002', '505aeb403b152e9d5b000003']
  },
  currentParagraphDefinition: '505aeb403b152e9d5b000002',
  __v: 0,
  score: 137
};



console.log(object);