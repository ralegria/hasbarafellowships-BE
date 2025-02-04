import { DataTypes, literal } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./users.model.js";
import { Donation } from "./donations.model.js";

export const Goal = sequelize.define("goals", {
  id: {
    type: DataTypes.UUID,
    defaultValue: literal("gen_random_uuid()"),
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isMainGoal: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
});

User.hasMany(Goal, {
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: "user_id",
  sourceKey: "id",
});

Goal.hasMany(Donation, {
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: "goal_id",
  sourceKey: "id",
});
