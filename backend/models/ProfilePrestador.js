const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ProfilePrestador = sequelize.define('ProfilePrestador', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  especialidade: { type: DataTypes.STRING(200), allowNull: true },
  servicos: { type: DataTypes.TEXT, allowNull: true },
  experiencia: { type: DataTypes.STRING(100), allowNull: true },
  maquinas: { type: DataTypes.TEXT, allowNull: true },
  sobre: { type: DataTypes.TEXT, allowNull: true },
});

// Relacionamento 1:1
User.hasOne(ProfilePrestador);
ProfilePrestador.belongsTo(User);

module.exports = ProfilePrestador;