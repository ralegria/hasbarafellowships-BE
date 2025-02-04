import { DataTypes, literal } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./users.model.js";

export const Donation = sequelize.define("donations", {
  id: {
    type: DataTypes.UUID,
    defaultValue: literal("gen_random_uuid()"),
    primaryKey: true,
  },
  goal_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  donor_names: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  donor_lastnames: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  donor_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount_donated: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qgiv_paymentID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPaymentCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

User.hasMany(Donation, {
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: "user_id",
  sourceKey: "id",
});
