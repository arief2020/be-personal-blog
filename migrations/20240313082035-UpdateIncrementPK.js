'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.sequelize.query(`
      ALTER TABLE movies
      ALTER COLUMN id DROP IDENTITY;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE movies 
      ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (START WITH 101);
    `);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`
      ALTER TABLE movies
      ALTER COLUMN id DROP IDENTITY;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE movies 
      ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (START WITH 1);
    `);
  }
};
