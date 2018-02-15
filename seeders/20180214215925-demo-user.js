

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    queryInterface.bulkInsert('user_authenticates', [{
      userid: 'anmol5varma',
      password: 'abcd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    queryInterface.bulkDelete('Person', null, {}),

};
