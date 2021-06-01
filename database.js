const Sequelize = require("sequelize");

// connect to DB
const sequelize = new Sequelize("restaurant", "root", "YourPassword", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
