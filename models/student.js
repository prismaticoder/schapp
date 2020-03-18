'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    lga: DataTypes.STRING,
    state: DataTypes.STRING,
    cgpa: DataTypes.STRING,
    level: DataTypes.INTEGER,
    lastNotifCheck: DataTypes.DATE,
    department: DataTypes.STRING,
    faculty: DataTypes.STRING,
    matric: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    nationality: DataTypes.STRING,
    admissionYear: DataTypes.STRING,
    dob: DataTypes.STRING,
    otherName: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Scholarship, { through: models.Application });
    Student.hasMany(models.Application)
  };
  return Student;
};