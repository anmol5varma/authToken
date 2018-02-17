const Server = require('../server');
const Models = require('../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.user_authenticates.create({
      userid: 'anmolvarma',
      password: 'Scooby!23',
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

  test('Since the password is not valid we will get a bad request', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'asdasfafa',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Valid status code for correct password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  });

  test('Get access token for correct password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      console.log(response.result);
      expect(typeof response.headers.token).toBe('string');
      done();
    });
  });

  test('Invalid username and password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'dsfnnkds',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      console.log(response.result);
      expect(typeof response.result.message).toBe('Invalid username or password');
      done();
    });
  });
});
