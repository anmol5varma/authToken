const generateToken = require('./authRequest');
const verifyToken = require('./verifyRequest');
const deleteToken = require('./deleteRequest');

// require all the request files and export them in an array
module.exports = [].concat(generateToken, verifyToken, deleteToken);
