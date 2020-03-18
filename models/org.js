'use strict';
module.exports = (sequelize, DataTypes) => {
  const Org = sequelize.define('Org', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Org.associate = function(models) {
    // associations can be defined here
    Org.hasMany(models.Scholarship)
  };
  return Org;
};