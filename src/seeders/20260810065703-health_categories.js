"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
   
    */
    await queryInterface.bulkInsert(
      "health_categories",
      [
        {
          name: "อาหาร",
          type: "news",
          status: 1,
        },
        {
          name: "อารมณ์",
          type: "news",
          status: 1,
        },
        {
          name: "ออกกำลังกาย",
          type: "news",
          status: 1,
        },
        {
          name: "การดูแลสุขภาพ",
          type: "news",
          status: 1,
        },
        {
          name: "โรค",
          type: "news",
          status: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
