'use strict';

const {bcrypt} = require("../helpers");
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))
      .map(el => {
        el.createdAt = el.updatedAt = new Date();
        const salt = bcrypt.genSaltSync(10);
        el.password = bcrypt.hashSync(el.password, salt);
        return el;
      })
    
    await queryInterface.bulkInsert("Users", users);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users");
  }
};
