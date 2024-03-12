"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    ALTER TABLE movies
    ALTER COLUMN title SET NOT NULL,
    ALTER COLUMN genres SET NOT NULL,
    ALTER COLUMN year SET NOT NULL;
    `);

    await queryInterface.sequelize.query(`
    ALTER TABLE users
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN password SET NOT NULL,
    ALTER COLUMN role SET NOT NULL,
    ALTER COLUMN gender SET NOT NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.sequelize.query(`
    ALTER TABLE movies
    ALTER COLUMN title DROP NOT NULL,
    ALTER COLUMN genres DROP NOT NULL,
    ALTER COLUMN year DROP NOT NULL;
    `);

    await queryInterface.sequelize.query(`
    ALTER TABLE users
    ALTER COLUMN email DROP NOT NULL,
    ALTER COLUMN password DROP NOT NULL,
    ALTER COLUMN role DROP NOT NULL,
    ALTER COLUMN gender DROP NOT NULL;
    `);
    
  },
};
