const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          isLowercase: true,
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      health: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
      strength: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
      height: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
          min: 1,
        },
      },
    },
    { timestamps: false }
  );
};
