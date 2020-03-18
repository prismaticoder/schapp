'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      cgpa: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      lastNotifCheck: {
        type: Sequelize.DATE
      },
      department: {
        type: Sequelize.STRING
      },
      faculty: {
        type: Sequelize.STRING
      },
      matric: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      admissionYear: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      hasLoggedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      otherName: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};