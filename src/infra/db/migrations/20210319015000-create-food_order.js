'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('food_order', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      observation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      food_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'foods',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('food_order')
  }
}
