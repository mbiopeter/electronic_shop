'use strict';
// npx sequelize-cli migration:generate --name create-Coupon-table
// npx sequelize-cli db:migrate
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coupon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      discountType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      discountAmount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      minimumAmount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      expiry: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Active'
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coupon');
  }
};
