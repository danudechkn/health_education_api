'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surveys', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      session_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      score_q1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score_q2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score_q3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('surveys');
  }
};
