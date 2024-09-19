'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'idNo', 'idNumber');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'idNumber', 'idNo');
  }
};
