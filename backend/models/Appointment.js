const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Appointment = sequelize.define('agenda', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  prestador_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  empresa_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tipo_servico: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  inicio: { type: DataTypes.DATE, allowNull: false },
  fim: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING(30), defaultValue: 'agendado' }, // agendado, concluido, cancelado
}, {
  tableName: 'agenda',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

Appointment.belongsTo(User, { as: 'prestador', foreignKey: 'prestador_id', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { as: 'empresa', foreignKey: 'empresa_id', onDelete: 'CASCADE' });
User.hasMany(Appointment, { as: 'agendasComoPrestador', foreignKey: 'prestador_id' });
User.hasMany(Appointment, { as: 'agendasComoEmpresa', foreignKey: 'empresa_id' });

module.exports = Appointment;