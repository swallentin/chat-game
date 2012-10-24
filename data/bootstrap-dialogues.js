var mongoose = require('mongoose'),
  Dialogue = require('../lib/models/Dialogue').Model,
  Paragraph = require('../lib/models/Paragraph').Model,
  config = require('../config');

mongoose.connect(config.mongodb);

var dialogue = new Dialogue({
  topic: "Learning to have a dialogue!",
  icon: "learning.png",
  paragraphs: ["505aeb403b152e9d5b000004", "505be63e51b843c172000004"]
});

dialogue.save(function(err, doc) {
  mongoose.disconnect();
  console.log('finished');
});
