const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo_servico: { type: DataTypes.STRING(200), allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  data_fim: { type: DataTypes.DATEONLY, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fim: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('pendente', 'confirmado', 'concluido', 'cancelado'), defaultValue: 'pendente' }
});

// Relacionamentos: prestador (quem executa) e empresa/cliente (quem contrata)
ServiceRequest.belongsTo(User, { as: 'prestador', foreignKey: 'prestador_id' });
ServiceRequest.belongsTo(User, { as: 'cliente', foreignKey: 'cliente_id' });

module.exports = ServiceRequest;