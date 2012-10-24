var APIeasy = require('api-easy')
  , assert = require('assert')
  , mongoose = require('mongoose');

var suite = APIeasy.describe('Testing the /users RESTful API.');

var user = {
  _id: new mongoose.Types.ObjectId,
  name: 'new-user'
};

suite.use('local.dev', 3000)

  .discuss('When creating a document via ')
    // this header is important, without it express will not trigger the POST action
    .setHeader('Content-Type', 'application/json')
    .post('/users', user)
      .expect(201)
      .expect('should contain location header with an url to the new document', function(err, res, body) {
        assert.include(res.headers, "location");
      })
  .undiscuss()

  .discuss('When fetching an existing document via')
    .next()
    .get('/users/'+user._id)
      .expect(200)
  .undiscuss()

  .discuss('When updating an existing created document via')
    .next()
    .put('/users/'+user._id, { name: 'new-user-name'} )
      .expect(200)
      .expect('should contain the update', function(err, res, body) {
        var result = JSON.parse(body);
        assert.equal(result.name, 'new-user-name');
      })
  .undiscuss()

  .discuss('When fetching a users collection')
    .next()
    .get('/users')
      .expect(200)
      .expect('should contain a previously created document', function(err, res, body) {
        var result = JSON.parse(body);
        var containsDocument = false;

        result.forEach(function(doc) {
          if(doc._id == user._id) {
            containsDocument=true;
            return;
          }
        });
        assert.isTrue(containsDocument);
      })
  .undiscuss()

  .discuss('When deleting an existing via')
    .next()
    .del('/users/'+user._id)
      .expect(200)
  .undiscuss()


  .discuss('When fetching a non-existing document via')
    .next()
    .get('/users/'+user._id)
      .expect(404)
  .undiscuss()

  .export(module);