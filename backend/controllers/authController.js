const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { jwtSecret, jwtExpiresIn, resetTokenExpiresIn } = require('../config/auth');
const { enviarEmail } = require('../utils/emailService');

// ========== REGISTRO ==========
exports.register = async (req, res) => {
  try {
    const { nome, sobrenome, email, senha, tipo_usuario, endereco, cidade, estado, whatsapp } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email já cadastrado' });

    const user = await User.create({
      nome, sobrenome, email, senha, tipo_usuario, endereco, cidade, estado, whatsapp
    });

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiresIn });
    res.status(201).json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        foto_perfil: user.foto_perfil || null,
        cidade: user.cidade,
        estado: user.estado,
        whatsapp: user.whatsapp
      }
    });
  } catch (err) {
    console.error('Erro no register:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========== LOGIN ==========
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await user.validarSenha(senha);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiresIn });
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        foto_perfil: user.foto_perfil || null,
        cidade: user.cidade,
        estado: user.estado,
        whatsapp: user.whatsapp
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========== ESQUECI A SENHA ==========
exports.forgotPassword = async (req, res) => {
  try {
    console.log('1. Iniciando forgotPassword');
    const { email } = req.body;
    console.log('2. Email recebido:', email);

    const user = await User.findOne({ where: { email } });
    console.log('3. Usuário encontrado:', user ? 'sim' : 'não');
    
    if (!user) {
      return res.status(404).json({ error: 'Email não encontrado' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    console.log('4. Token gerado:', token);

    const expiracao = new Date(Date.now() + resetTokenExpiresIn);
    console.log('5. Data de expiração:', expiracao);

    await PasswordReset.create({
      usuario_id: user.id,
      token,
      expiracao
    });
    console.log('6. Token salvo no banco');

    const link = `https://planov.onrender.com/redefinir-senha.html?token=${token}`;
    console.log('7. Link gerado:', link);

    console.log('8. Tentando enviar email...');
    await enviarEmail(
      email,
      'Recuperação de senha - PlanoV',
      `<p>Clique no link para redefinir sua senha: <a href="${link}">${link}</a></p>`
    );
    console.log('9. Email enviado com sucesso');

    res.json({ message: 'Email enviado com sucesso' });
  } catch (err) {
    console.error('❌ ERRO NO forgotPassword:', err);
    res.status(500).json({ error: err.message });
  }
};

// ========== REDEFINIR SENHA ==========
exports.resetPassword = async (req, res) => {
  try {
    const { token, novaSenha } = req.body;
    console.log(`Tentativa de redefinição com token: ${token}`);

    const reset = await PasswordReset.findOne({
      where: {
        token,
        expiracao: { [Op.gt]: new Date() }
      }
    });
    if (!reset) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    const user = await User.findByPk(reset.usuario_id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.senha = novaSenha;
    await user.save();

    // Remove token usado
    await reset.destroy();

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    console.error('Erro no resetPassword:', err);
    res.status(500).json({ error: err.message });
  }
};