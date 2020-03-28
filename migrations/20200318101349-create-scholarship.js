'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Scholarships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      orgId: {
        type: Sequelize.INTEGER,
        references: { model: 'orgs', key: 'id' }
      },
      deadline: {
        type: Sequelize.DATE
      },
      restrictions: {
        type: Sequelize.STRING
      },
      imageLogo: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT('long')
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
    return queryInterface.dropTable('Scholarships');
  }
};