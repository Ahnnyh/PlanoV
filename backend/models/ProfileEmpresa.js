const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ProfileEmpresa = sequelize.define('ProfileEmpresa', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sobre: { type: DataTypes.TEXT, allowNull: true },
  servicos_contrata: { type: DataTypes.TEXT, allowNull: true }, // armazenar como JSON ou texto
});

User.hasOne(ProfileEmpresa);
ProfileEmpresa.belongsTo(User);

module.exports = ProfileEmpresa;