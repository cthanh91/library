'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Books', 'category', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Books', 'category');
  }
};
