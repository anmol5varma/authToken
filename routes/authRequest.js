const uuidv1 = require('uuid/v1');
const Models = require('../models');
// const Boom = require('Boom');

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    handler: (request, response) => {
      const getUUID = uuidv1();
      const username = request.payload.userName;
      const password = request.payload.userPassword;
      Models.user_authenticates.findOne({
        where: {
          userid: username,
          password,
        },
      })
        .then((userEntry) => {
          if (userEntry) {
            if (userEntry.token === null) {
              Models.user_authenticates.update({
                token: getUUID,
              }, {
                where: {
                  userid: username,
                },
              })
                .then((ifUpdated) => {
                  if (ifUpdated[0] === 1) {
                    response({ message: 'User authenticated', statusCode: 200 }).header('token', getUUID);
                  } else {
                    response({ message: 'Server error', statusCode: 500, token: null });
                  }
                });
            } else {
              response({ message: 'User already logged in.', statusCode: 204 }).header('token', null);
            }
          } else {
            response({ message: 'Invalid username or password', statusCode: 401 }).header('token', null);
          }
        })
        .catch((err) => {
          response({ message: err.message, statusCode: 500 }).header('token', null);
        });
    },
  },
];
