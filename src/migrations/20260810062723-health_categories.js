'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('health_categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: 'news',
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('health_categories');
  }
};
