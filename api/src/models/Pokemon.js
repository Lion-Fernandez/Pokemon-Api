const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vida: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fuerza: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defensa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    velocidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    propios: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
}
