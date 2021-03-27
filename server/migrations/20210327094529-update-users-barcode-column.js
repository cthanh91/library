'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     queryInterface.renameColumn('Users', 'barCode', 'barcode');
  },

  down: async (queryInterface, Sequelize) => {
     queryInterface.renameColumn('Users', 'barcode', 'barCode');
  }
};
