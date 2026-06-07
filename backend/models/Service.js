const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Service = sequelize.define('servicos', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  nome_servico: { type: DataTypes.STRING(100), allowNull: false },
  categoria: { type: DataTypes.STRING(50), allowNull: true }, // 'serviço' ou 'maquinário'
  descricao: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'servicos',
  timestamps: true,
  createdAt: false,
  updatedAt: false
});

Service.belongsTo(User, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
User.hasMany(Service, { foreignKey: 'usuario_id', as: 'servicos_prestador' });

module.exports = Service;