const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define( 'tipo' , {
    nombre: {
      //type: DataTypes.ENUM("normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"),
       type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
