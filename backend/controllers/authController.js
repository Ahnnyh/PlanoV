const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { jwtSecret, jwtExpiresIn, resetTokenExpiresIn } = require('../config/auth');
const { enviarEmail } = require('../utils/emailService');

// Registro
// Registro
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
    res.status(500).json({ error: err.message });
  }
};

// Login
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
    res.status(500).json({ error: err.message });
  }
};

// Esqueci a senha - gera token e salva na tabela recuperacao_senha
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Email não encontrado' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + resetTokenExpiresIn);

    await PasswordReset.create({
      usuario_id: user.id,
      token,
      expiracao
    });

    exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Email não encontrado' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + resetTokenExpiresIn);

    await PasswordReset.create({
      usuario_id: user.id,
      token,
      expiracao
    });

    // ✅ CORREÇÃO: link público
    const link = `https://planov.onrender.com/redefinir-senha.html?token=${token}`;
    
    await enviarEmail(email, 'Recuperação de senha - PlanoV',
      `<p>Clique no link para redefinir sua senha: <a href="${link}">${link}</a></p>`);

    res.json({ message: 'Email enviado com sucesso' });
  } catch (err) {
    console.error('Erro no forgotPassword:', err);
    res.status(500).json({ error: err.message });
  }
};
    await enviarEmail(email, 'Recuperação de senha - PlanoV',
      `<p>Clique no link para redefinir sua senha: <a href="${link}">${link}</a></p>`);

    res.json({ message: 'Email enviado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Redefinir senha
exports.resetPassword = async (req, res) => {
  try {
    const { token, novaSenha } = req.body;
    const reset = await PasswordReset.findOne({
      where: {
        token,
        expiracao: { [Op.gt]: new Date() }
      }
    });
    if (!reset) return res.status(400).json({ error: 'Token inválido ou expirado' });

    const user = await User.findByPk(reset.usuario_id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.senha = novaSenha;
    await user.save();

    // Remove token usado
    await reset.destroy();

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};