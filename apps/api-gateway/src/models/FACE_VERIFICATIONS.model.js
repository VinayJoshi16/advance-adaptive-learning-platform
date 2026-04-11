const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FaceVerification = sequelize.define(
  "FaceVerification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    exam_session_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    result: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["verified", "not_verified", "suspicious"]],
      },
    },

    confidence_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1,
      },
    },

    captured_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "face_verifications",
    timestamps: false, // since you already have captured_at
  }
);

module.exports = FaceVerification;