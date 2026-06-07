const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const { bcryptRounds } = require('../config/auth');

const User = sequelize.define('usuarios', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  sobrenome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(255), allowNull: false },
  tipo_usuario: { type: DataTypes.STRING(20), allowNull: false },
  endereco: { type: DataTypes.STRING(255), allowNull: true },
  cidade: { type: DataTypes.STRING(100), allowNull: true },
  estado: { type: DataTypes.STRING(2), allowNull: true },
  foto_perfil: { type: DataTypes.TEXT('long'), allowNull: true }, // LONGTEXT
  experiencia: { type: DataTypes.TEXT, allowNull: true },
  disponibilidade: { type: DataTypes.BOOLEAN, defaultValue: true },
  whatsapp: { type: DataTypes.STRING(20), allowNull: true },
  nicho: { type: DataTypes.STRING(100), allowNull: true },
  cultivo: { type: DataTypes.STRING(100), allowNull: true },
  regiao: { type: DataTypes.STRING(100), allowNull: true },
  sobre: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.senha) user.senha = await bcrypt.hash(user.senha, bcryptRounds);
    },
    beforeUpdate: async (user) => {
      if (user.changed('senha')) user.senha = await bcrypt.hash(user.senha, bcryptRounds);
    }
  }
});

User.prototype.validarSenha = async function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = User;