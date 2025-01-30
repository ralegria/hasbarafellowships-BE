import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstnames: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastnames: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university_name: {
    type: DataTypes.STRING,
  },
  page_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  page_description: {
    type: DataTypes.STRING,
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover_pic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
