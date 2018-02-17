const Models = require('../models');
// const Boom = require('boom');

const fetchUserEntry = (username, accessToken) => Models.user_authenticates.findOne({
  where: {
    userid: username,
    token: accessToken,
  },
});

module.exports = [
  {
    method: 'GET',
    path: '/auth',
    handler: (request, response) => {
      const username = request.headers.user;
      const accessToken = request.headers.token;
      console.log(username, accessToken);
      return fetchUserEntry(username, accessToken).then((userEntry) => {
        if (userEntry && accessToken) {
          response({ message: 'User is verified', statusCode: 200 });
        }
        response({ message: 'User is not verified. Redirect to login page', statusCode: 401 });
      }).catch((err) => {
        response({ message: err.message, statusCode: 500 }).header('token', null);
      });
    },
  },
];
