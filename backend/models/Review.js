const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Review = sequelize.define('avaliacoes', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  avaliador_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  avaliado_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  nota: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comentario: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'avaliacoes',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

Review.belongsTo(User, { as: 'avaliador', foreignKey: 'avaliador_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { as: 'avaliado', foreignKey: 'avaliado_id', onDelete: 'CASCADE' });
User.hasMany(Review, { as: 'avaliacoesFeitas', foreignKey: 'avaliador_id' });
User.hasMany(Review, { as: 'avaliacoesRecebidas', foreignKey: 'avaliado_id' });

module.exports = Review;