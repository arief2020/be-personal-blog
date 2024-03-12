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

    await queryInterface.sequelize.query(
      `UPDATE movies SET id = 100 WHERE title = 'test123';`
    );

    await queryInterface.sequelize.query(`
      ALTER TABLE movies 
      ADD PRIMARY KEY (id);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users 
      ADD PRIMARY KEY (id);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users 
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
      DROP CONSTRAINT movies_pkey;
    `);
    

    await queryInterface.sequelize.query(`
      ALTER TABLE users 
      DROP CONSTRAINT users_pkey;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ALTER COLUMN id DROP IDENTITY;
    `);

    await queryInterface.sequelize.query(
      `UPDATE movies SET id = 1 WHERE title = 'test123';`
    );
  }
};
