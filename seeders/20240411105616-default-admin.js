'use strict';
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // hash password
    const encryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    return queryInterface.bulkInsert('admin', [{
      adminName: process.env.ADMIN_NAME,
      adminEmail: process.env.ADMIN_EMAIL,
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    const adminEmail = process.env.ADMIN_EMAIL;

    return queryInterface.bulkDelete('admin', null, {
      where: {
        adminEmail: {
          adminEmail
        }
      }
    });
  }
};
