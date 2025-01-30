import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "hasbara-donations",
  "postgres",
  "1995",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
