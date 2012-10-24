var User = require('../../models/User').Model;

exports.map = function(app, path) {

  // Fetches all current users from mongo
  app.get('/users', get_users);
  // Fetches a user on it's ObjectId
  app.get('/users/:id', get_user);

  // Creates a new users and return the URL to the new document
  app.post('/users', post_user);
  // Creates a document if it doesn't exist, update document if it already exists
  app.put('/users/:id', put_user);
  // Deletes a document
  app.del('/users/:id', del_user );
  
}

// GET /users
var get_users = exports.get_users = function(req, res) {

  User.find().exec(function(err, docs) {
    if( err ) {
      res.status(500).send(err.toString());
      return;
    }
    res.send(docs);
  });

}

 // GET /user
var get_user = exports.get_user = function(req, res) {

  User.findById( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        
        if( !doc ) {
          res.send(404)
          return;
        }

        res.send(doc);

     });
}

// PUT /users/{id}
var put_user = exports.put_user = function(req, res) {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body).exec(function(err, doc) {

    if( err ) {
      res.status(201).send(err.toString());
      return;
    }

    res.send(doc);

  });

}

// DELETE /users/{id}
var del_user = exports.del_user = function(req, res) {

  User.findByIdAndRemove( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }

        if( doc == 'undefined') {
          res.send(404)
          return
        }

        res.send(200);
      });
}

// POST /users
var post_user = exports.post_user = function(req, res) {
  var user = new User(req.body);
  user.save(function(err, doc) {
    setDocumentLoacationHeader(res, doc);
    res.status(201).json(doc);
  });

}

function setDocumentLoacationHeader(res, doc) {
  res.setHeader("Location", doc._id );
}
