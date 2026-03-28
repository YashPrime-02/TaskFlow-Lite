// src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

module.exports = User;