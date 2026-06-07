require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const companyRoutes = require('./routes/companyRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/reviews', reviewRoutes);

// Sincronizar modelos e iniciar servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}).catch(err => console.error('Erro ao conectar:', err));