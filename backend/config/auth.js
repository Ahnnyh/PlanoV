// ===== CONFIGURAÇÕES DE AUTENTICAÇÃO =====
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'planov_super_secret_key_change_me',
  jwtExpiresIn: '7d',      // tempo de expiração do token
  bcryptRounds: 10,        // número de rounds para hash de senha
  resetTokenExpiresIn: 3600000, // 1 hora em milissegundos
};