const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Type",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
