'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_calendar', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      event_time: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      organizer: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events_calendar');
  }
};
