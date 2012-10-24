var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    GameSchema = new Schema({
    'dialogue': { type: ObjectId, ref: "Dialogue" },
    'player_a': { type: ObjectId, ref: "User" },
    'player_b': { type: ObjectId, ref: "User" },
    'currentParagraph': { type: ObjectId, ref: "Paragraph" },
    'currentParagraphDefinition': { type: ObjectId, ref: "ParagraphDefinition" },
    'score': { type: Number, default: 0}
  });

exports.Model = mongoose.model('Game', GameSchema);

