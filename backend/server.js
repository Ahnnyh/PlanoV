require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Importação de modelos (necessário para a rota de delete)
const User = require('./models/User');

// Importação de middlewares
const authenticateToken = require('./middlewares/authMiddleware');

// Importação de rotas
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const companyRoutes = require('./routes/companyRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/reviews', reviewRoutes);

// Rota para excluir conta (protegida por token)
app.delete('/api/user/delete', authenticateToken, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.destroy(); // com CASCADE, deleta tudo relacionado
    res.json({ message: 'Conta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS existe?', !!process.env.EMAIL_PASS);
console.log('JWT_SECRET existe?', !!process.env.JWT_SECRET);

// Sincronizar banco de dados (sem alterar estrutura existente)
sequelize.sync({ alter: false }).then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}).catch(err => console.error('Erro ao conectar:', err));
