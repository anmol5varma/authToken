const Models = require('../models');
// const Boom = require('boom');

const deleteUserToken = (username, accessToken) => Models.user_authenticates.update({
  token: null,
}, {
  where: {
    userid: username,
    token: accessToken,
  },
});

module.exports = [
  {
    method: 'DELETE',
    path: '/auth',
    handler: (request, response) => {
      const username = request.headers.user;
      const accessToken = request.headers.token;
      console.log(username, accessToken);
      return deleteUserToken(username, accessToken).then((userEntry) => {
        if (userEntry[0] === 1) {
          response({ message: 'User loggedout', statusCode: 200 });
        }
        response({ message: 'Invalid request', statusCode: 401 });
      }).catch((err) => {
        response({ message: err.message, statusCode: 500 }).header('token', null);
      });
    },
  },
];
