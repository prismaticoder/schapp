'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};