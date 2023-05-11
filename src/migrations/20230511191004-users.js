'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'display_name',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('users');
  },
};

