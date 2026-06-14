const { Sequelize } = require('sequelize');
require('dotenv').config();

// Monta a string de conexão para o Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 4000, // A porta padrão do TiDB Cloud é 4000
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
    logging: false, // Desabilita logs de SQL no console (opcional, mas recomendado)
  }
);

module.exports = sequelize;