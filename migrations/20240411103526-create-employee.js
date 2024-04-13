'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empNo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      empName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      empAddressLine1: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      empAddressLine2: {
        type: Sequelize.STRING(100)
      },
      empAddressLine3: {
        type: Sequelize.STRING(100)
      },
      empDateOfJoin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      empStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      empImage: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      empAdminId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee');
  }
};