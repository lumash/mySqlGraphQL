const { DataTypes } = require("sequelize");
const sequelize = require("../database");

/// orderItem model
const orderItem = sequelize.define("order_item", {
  id: {
    type: DataTypes.INTEGER, // Integer Datatype
    autoIncrement: true, // Increment the value automatically
    allowNull: false, //id can not be null.
    primaryKey: true, // To uniquely identify user
  },
  orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  mealId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  itemPrice: { type: DataTypes.INTEGER.UNSIGNED },
  quntity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  totalPrice: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
});

module.exports = orderItem;
