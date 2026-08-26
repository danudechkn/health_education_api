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
      "categories",
      [
        {
          name: "ข่าวประชาสัมพันธ์",
          type: "news",
          status: 1,
        },
        {
          name: "ข่าวกิจกรรม",
          type: "news",
          status: 1,
        },
        {
          name: "สื่ออินโฟกราฟฟิก",
          type: "media",
          status: 1,
        },
        {
          name: "สื่อมัลติมิเดีย",
          type: "media",
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
  
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
