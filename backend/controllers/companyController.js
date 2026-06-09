const { Op } = require('sequelize');
const User = require('../models/User');

exports.searchCompanies = async (req, res) => {
  try {
    const { search, cidade } = req.query;
    const where = { tipo_usuario: 'empresa' };
    if (search) {
      where[Op.or] = [
        { nome: { [Op.like]: `%${search}%` } },
        { sobrenome: { [Op.like]: `%${search}%` } }
      ];
    }
    if (cidade) where.cidade = cidade;

    const companies = await User.findAll({
      where,
      attributes: ['id', 'nome', 'sobrenome', 'cidade', 'estado', 'foto_perfil', 'nicho', 'cultivo']
    });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchProviders = async (req, res) => {
  try {
    const { search, cidade, servico } = req.query;
    const where = { tipo_usuario: 'prestador' };
    if (search) {
      where[Op.or] = [
        { nome: { [Op.like]: `%${search}%` } },
        { sobrenome: { [Op.like]: `%${search}%` } }
      ];
    }
    if (cidade) where.cidade = cidade;

    const providers = await User.findAll({
      where,
      attributes: ['id', 'nome', 'sobrenome', 'cidade', 'estado', 'foto_perfil', 'whatsapp', 'experiencia', 'especialidade', 'servicos']
    });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};