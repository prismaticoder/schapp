'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scholarshipId: {
        type: Sequelize.INTEGER,
        references: { model: 'Scholarships', key: 'id' }
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Students', key: 'id' }
      },
      status: {
        type: Sequelize.ENUM(['ongoing','accepted','rejected'])
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
    return queryInterface.dropTable('Applications');
  }
};