
module.exports = (sequelize, DataTypes) => {
  const user_authenticate = sequelize.define('user_authenticates', {
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return user_authenticate;
};
