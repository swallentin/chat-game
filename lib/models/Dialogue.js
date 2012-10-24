var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId,
   DialogueSchema = new Schema({
    'topic': { type: String },
    'icon': { type: String },
    'paragraphs': [{ type: ObjectId, ref: "Paragraph" }]
  });

exports.Model = mongoose.model('Dialogue', DialogueSchema);