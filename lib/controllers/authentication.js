var User = require('../models/User').Model;

var _app;

exports.map = function(app, path) {
  _app = app;
  // Fetches all current games from mongo
  app.get('/login', get_login);
  app.get('/login/:id', get_login_byId);
  app.get('/logout', get_logout);
}

var get_login = exports.get_login = function(req, res) {

  User.find(function(err, docs)  {

    res.render('login', { 
      title: 'Welcome!', 
      livereload: _app.set('livereload'),
      users: docs
    });

  });
}

var get_login_byId = exports.get_login_byId = function(req, res) {

  User.findById(req.params.id, function(err, doc) {
    if(err) {
      res.status(500).send(err.toString());
      return;
    }

    if(!doc) {
      res.status(500).send({message:'User does not exist'});
      return;
    }

    req.session.userIdentity = {
      _id: doc._id,
      name: doc.name
    };

    res.redirect('/');
    // res.send(req.session.userIdentity);
  });

};

var get_logout = exports.get_logout = function(req, res) {

  delete req.session.userIdentity;
  res.redirect('/');
};


exports.middleware = function(req, res, next) {
  if(!req.session.userIdentity) {
    res.redirect('/login');
    return;
  }
  next();
}