const Server = require('../server');
const Models = require('../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.user_authenticates.create({
      userid: 'anmolvarma',
      password: 'Scooby!23',
      token: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      done();
    }).catch();
  });

  afterEach((done) => {
    Models.user_authenticates.destroy({
      where: { userid: 'anmolvarma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Verify a user', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      header: {
        user: 'anmolvarma',
        token: '1234',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User is verified');
      done();
    });
  });
});
