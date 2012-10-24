var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , UserSchema = new Schema({
    'name': { type: String },
    'icon': { type: String },
    'games': [{ type: ObjectId, ref: 'Game'}]
  });

exports.Schema = UserSchema;
exports.Model = mongoose.model('User', UserSchema);