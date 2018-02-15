const Server = require('../server');
const Models = require('../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.bankusers.create({
      userid: 'anmol5varma',
      password: 'abcd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      done();
    }).catch();
  });
  afterEach((done) => {
    Models.bankusers.destroy({
      where: { userName: 'anmol5varma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/dashboard?username=anmol5varma',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Get access token for correct password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  });
});
