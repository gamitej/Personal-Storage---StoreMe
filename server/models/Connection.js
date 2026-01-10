const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DAILECT || "postgres",
    logging: false,
  }
);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully. ✅");
  } catch (error) {
    console.error("Unable to connect to the database: ❌", error);
  }
};

module.exports = { sequelize, syncDatabase };
