var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  ParagraphDefinitionSchema = new Schema({
    'difficulty': {
      type: Number
    },
    'text': {
      type: String
    },
    'definition': {
      type: String
    },
    'alternatives': [String]
  });

exports.Schema = ParagraphDefinitionSchema;
exports.Model = mongoose.model('ParagraphDefinition', ParagraphDefinitionSchema);