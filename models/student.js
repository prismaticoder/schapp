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
    hasLoggedIn: DataTypes.BOOLEAN,
    otherName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.hasMany(models.Application)
    Student.belongsToMany(models.Scholarship, { through: models.Application });
  };
  return Student;
};