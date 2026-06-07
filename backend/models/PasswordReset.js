const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const PasswordReset = sequelize.define('recuperacao_senha', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  token: { type: DataTypes.STRING(255), allowNull: false },
  expiracao: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'recuperacao_senha',
  timestamps: false
});

PasswordReset.belongsTo(User, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
User.hasMany(PasswordReset, { foreignKey: 'usuario_id' });

module.exports = PasswordReset;