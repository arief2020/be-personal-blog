'use strict';

const { hashPassword } = require('../libs/bcrypt');

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
    return queryInterface.bulkInsert('users', [
      {
      email: 'budi@gmail.com',
      password: hashPassword("12345678"),
      gender: 'male',
      role: 'users',
      },
      {
      email: 'santi@gmail.com',
      password: hashPassword("12345678"),
      gender: 'female',
      role: 'admin',
      },

  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
