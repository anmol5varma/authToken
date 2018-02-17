const auth = require('./authRequest');
const verify = require('./verifyRequest');

// require all the request files and export them in an array
module.exports = [].concat(auth, verify);
