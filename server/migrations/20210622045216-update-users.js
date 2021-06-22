'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'dateOfBirth', { type: Sequelize.STRING });
    queryInterface.addColumn('Users', 'schoolYear', { type: Sequelize.INTEGER });
    queryInterface.addColumn('Users', 'position', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'dateOfBirth');
    queryInterface.removeColumn('Users', 'schoolYear');
    queryInterface.removeColumn('Users', 'position');
  }
};
