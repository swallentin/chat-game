var APIeasy = require('api-easy')
  , assert = require('assert');

var suite = APIeasy.describe('Testing the authentication.');

var user = {
  _id: '5056f7e3d89068863d000001',
  name: 'User A'
};

suite.use('local.dev', 3000)

  .discuss('When authenticating without a user id via')
    // this header is important, without it express will not trigger the POST action
    .setHeader('Content-Type', 'application/json')
    .post('/login', user)
      .expect(404)
  .undiscuss()

  .discuss('When authanticating with an invalid user id via')
    .next()
    .get('/login/aaaa')
      .expect(500)
  .undiscuss()

  .discuss('When authenticating with a existing user id via')
    .next()
    .followRedirect(false)
    .get('/login/'+user._id)
      .expect(302)
  .undiscuss()

  .discuss('When login out via')
    .next()
    .followRedirect(false)
    .get('/logout')
      .expect(302)
    .next()
      .followRedirect(true)
      .get('/logout')
      .expect(200)
  .undiscuss()


  .export(module);