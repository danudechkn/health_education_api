"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
      type: {
        type: Sequelize.ENUM("news", "media"),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  },
};
