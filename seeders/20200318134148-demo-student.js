'use strict';

var faker = require('faker');
var states = require('../public/states-and-locals')


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   var newData = [];

   for (let i = 0; i < 101; i++) {
       const seedData = {
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           email: faker.internet.email(),
           otherName: faker.name.firstName(),
           state: faker.random.arrayElement(states).state.name,
           lga: faker.random.arrayElement(states).state.locals[1].name,
           matric: faker.random.number({min:190000,max:215999}),
           cgpa: faker.finance.amount(1,4,2),
           level: faker.random.arrayElement([100,200,300,400,500]),
           createdAt: new Date(),
           updatedAt: new Date()
       };
       newData.push(seedData);
   }

   return queryInterface.bulkInsert('Students', newData);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
