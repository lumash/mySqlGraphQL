const { DataTypes } = require("sequelize");
const sequelize = require("../database");

/// Meal model
const Meal = sequelize.define("meals", {
  id: {
    type: DataTypes.INTEGER, // Integer Datatype
    autoIncrement: true, // Increment the value automatically
    allowNull: false, //id can not be null.
    primaryKey: true, // To uniquely identify user
  },
  name: { type: DataTypes.STRING, allowNull: false },
  imageLink: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  active: { type: DataTypes.TINYINT(1) },
  createdDate: { type: DataTypes.DATE, defaultValue: Date.now },
});

module.exports = Meal;
