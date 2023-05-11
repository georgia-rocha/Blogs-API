'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('categories');
  },
};