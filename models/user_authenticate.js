'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_authenticate = sequelize.define('user_authenticate', {
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_authenticate;
};