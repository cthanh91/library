'use strict';
const { User } = require('../models');
const { hashPassword } = require('../util/password');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = await User.create({
      username: "admin",
      password: hashPassword("1"),
      name: "Admin",
      barCode: "1",
      role: "Administrator"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
