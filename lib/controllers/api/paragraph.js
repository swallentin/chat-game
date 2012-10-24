var Paragraph = require('mongoose').model('Paragraph');

exports.map = function(app, path) {

  // Fetches all current paragraphs from mongo
  app.get('/paragraphs', get_paragraphs);

  // Fetches a paragraph on it's ObjectId
  app.get('/paragraphs/:id', get_paragraph);

  // Creates a new paragraphs and return the URL to the new document
  app.post('/paragraphs', post_paragraph);

  // Creates a document if it doesn't exist, update document if it already exists
  app.put('/paragraphs/:id', put_paragraph);

  // Deletes a document
  app.del('/paragraphs/:id', del_paragraph );
  
};

// GET /paragraphs
var get_paragraphs = exports.get_paragraphs = function(req, res) {

  Paragraph.find()
      .populate('alternatives')
      .exec(function(err, docs) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        res.send(docs);
        
      });

};

 // GET /paragraph
var get_paragraph = exports.get_paragraph = function(req, res) {

  Paragraph.findById( req.params.id )
      .populate('alternatives')
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }
        
        if( !doc ) {
          res.send(404);
          return;
        }

        res.send(doc);

     });
};

// PUT /paragraphs/{id}
var put_paragraph = exports.put_paragraph = function(req, res) {
  console.log(req.body);
  Paragraph.findByIdAndUpdate(req.params.id, req.body)
      .populate('alternatives')
      .exec(function(err, doc) {

    if( err ) {
      res.status(201).send(err.toString());
      return;
    }

    res.send(doc);

  });

};

// DELETE /paragraphs/{id}
var del_paragraph = exports.del_paragraph = function(req, res) {

  Paragraph.findByIdAndRemove( req.params.id )
      .exec(function(err, doc) {

        if( err ) {
          res.status(500).send(err.toString());
          return;
        }

        if( doc == 'undefined') {
          res.send(404);
          return;
        }

        res.send(200);
      });
};

// POST /paragraphs
var post_paragraph = exports.post_paragraph = function(req, res) {
  var paragraph = new Paragraph(req.body);
  paragraph.save(function(err, doc) {
    setDocumentLoacationHeader(res, doc);
    res.status(201).json(doc);
  });

};

function setDocumentLoacationHeader(res, doc) {
  res.setHeader("Location", doc._id );
};
