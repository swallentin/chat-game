var mongoose = require('mongoose'),
  User = require('../lib/models/User').Model,
  config = require('../config');


mongoose.connect(config.mongodb);

var user = new User({
  name: 'User A'
});
var user2 = new User({
  name: 'User B'
});

user.save(function(err, doc) {
  user2.save(function(err, doc) {
    mongoose.disconnect();
    console.log('finished');
  });
});