var mongoose = require('mongoose'),
  ParagraphDefinition = require('../lib/models/ParagraphDefinition').Model,
  Paragraph = require('../lib/models/Paragraph').Model,
  config = require('../config');


mongoose.connect(config.mongodb);

var def = new ParagraphDefinition({
  difficulty: 0,
  text: "What's the time?",
  alternatives: ["There is no more time!", "I don't understand!"]
});

var def2 = new ParagraphDefinition({
  difficulty: 1,
  text: "What's the time?",
  alternatives: ["There is no more time!", "I don't understand!"]
});

var def3 = new ParagraphDefinition({
  difficulty: 2,
  text: "What's the time?",
  alternatives: ["There is no more time!", "I don't understand!"]
});

def.save(function(err, doc) {
  def2.save(function(err, doc) {
    def3.save(function(err, doc) {

      var paragraph = new Paragraph({
        alternatives: [def._id, def2._id, def3._id]
      });

      paragraph.save(function(err, doc) {
        mongoose.disconnect();
        console.log('finished');
      });
    });
  });
});
