'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diseases', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_th: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      name_en: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      alphabet_group: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      tab_details: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tab_symptoms: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tab_situation: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tab_prevention: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diseases');
  }
};
