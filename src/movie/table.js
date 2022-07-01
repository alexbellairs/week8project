const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  actor: {
    type: DataTypes.STRING,
    defaultValue: "Not Specified",
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Movie;
