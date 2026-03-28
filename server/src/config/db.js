const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // ✅ ADD THIS
    dialect: "postgres",
    logging: false,
  }
);

// 🔁 Retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected");
      return;
    } catch (err) {
      console.log("⏳ DB not ready, retrying in 5s...");
      retries--;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("❌ Unable to connect to DB after retries");
};

module.exports = { sequelize, connectWithRetry };