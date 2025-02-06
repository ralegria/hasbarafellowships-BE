import "dotenv/config";
import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  "postgres",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);
