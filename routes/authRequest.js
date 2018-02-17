const uuidv1 = require('uuid/v1');
const Models = require('../models');
const Boom = require('boom');
const Joi = require('joi');

const schema = {
  userName: Joi.string().min(5).max(15).regex(/^[a-z][a-zA-Z0-9_]*$/i),
  /*
    password rules :
    1.Start with alphabet
    2.Contains atleast one digit, one capital,one special character [Order should be same]
    3.Contain any word character
  */
  password: Joi.string().min(6).max(20).regex(/^[a-zA-Z][a-zA-Z0-9_]*[0-9][a-zA-Z0-9_]*[A-Z][a-zA-Z0-9]*[%$^&*#@][a-zA-Z0-9_]*$/),
};


const fetchUserEntry = (username, password) => Models.user_authenticates.findOne({
  where: {
    userid: username,
    password,
  },
});

const updatehUserEntry = (username, value) => Models.user_authenticates.update({
  token: value,
}, {
  where: {
    userid: username,
  },
});


const checkUser = (userEntry, username) => {
  const getUUID = uuidv1();
  let userMessage = new Boom();
  if (userEntry) {
    if (userEntry.token === null) {
      updatehUserEntry(username, getUUID)
        .then((ifUpdated) => {
          if (ifUpdated[0] === 1) {
            userMessage = { message: 'User authenticated', statusCode: 200, token: getUUID };
          } else {
            // userMessage = Boom.serverUnavailable('Server error');
            // userMessage.token = null;
            userMessage = { message: 'Server error', statusCode: 500, token: null };
          }
        });
    } else {
      // userMessage = Boom.conflict('User already logged in');
      // userMessage.token = null;
      userMessage = { message: 'User already logged in', statusCode: 204, token: getUUID };
    }
  } else {
    // userMessage = Boom.unauthorized('Invalid username or password');
    // userMessage.token = null;
    userMessage = { message: 'Invalid username or password', statusCode: 401, token: getUUID };
  }
  return userMessage;
};


module.exports = [
  {
    method: 'POST',
    path: '/auth',
    handler: (request, response) => {
      const username = request.payload.userName;
      const password = request.payload.userPassword;
      fetchUserEntry(username, password)
        .then((userEntry) => {
          // console.log(userEntry, '***');
          const returnMessage = checkUser(userEntry, username);
          const accessToken = returnMessage.token;
          delete returnMessage.token;
          response(returnMessage).header('token', accessToken);
        })
        .catch((err) => {
          response({ message: err.message, statusCode: 500 }).header('token', null);
        });
    },

  },
];
