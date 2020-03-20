'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scholarship = sequelize.define('Scholarship', {
    name: DataTypes.STRING,
    orgId: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    restrictions: DataTypes.STRING,
    imageLogo: DataTypes.STRING,
    details: DataTypes.TEXT
  }, {});
  Scholarship.associate = function(models) {
    Scholarship.belongsToMany(models.Student, { through: models.Application });
    Scholarship.belongsTo(models.Org);
    Scholarship.hasMany(models.Application)
    // associations can be defined here
  };
  return Scholarship;
};