var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId,
   ParagraphSchema = new Schema({
    'alternatives': [{ type: ObjectId, ref: "ParagraphDefinition" }]
  });

exports.Schema = ParagraphSchema;
exports.Model = mongoose.model('Paragraph', ParagraphSchema);