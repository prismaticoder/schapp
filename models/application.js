'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    scholarshipId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    status: DataTypes.ENUM(['ongoing','accepted','rejected'])
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
  };
  return Application;
};