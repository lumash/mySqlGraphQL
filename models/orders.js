const { DataTypes } = require("sequelize");
const sequelize = require("../database");

/// Order model
const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER, // Integer Datatype
    autoIncrement: true, // Increment the value automatically
    allowNull: false, //id can not be null.
    primaryKey: true, // To uniquely identify user
  },
  useName: { type: DataTypes.STRING, allowNull: false },
  userAddress: { type: DataTypes.STRING, allowNull: true },
  userPhone: { type: DataTypes.STRING(10), allowNull: false },
  totalPrice: { type: DataTypes.INTEGER.UNSIGNED },
  orderDate: { type: DataTypes.DATE, defaultValue: Date.now },
});

module.exports = Order;
