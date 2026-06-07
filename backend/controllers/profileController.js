const User = require('../models/User');
const Service = require('../models/Service');

// Obter perfil público (com serviços se for prestador)
exports.getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['senha'] }
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    let servicos = [];
    if (user.tipo_usuario === 'prestador') {
      servicos = await Service.findAll({ where: { usuario_id: user.id } });
    }

    res.json({ user, servicos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar perfil do usuário logado
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      nome, sobrenome, endereco, cidade, estado, foto_perfil,
      experiencia, disponibilidade, whatsapp,
      nicho, cultivo, regiao, sobre
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Atualiza campos comuns
    await user.update({
      nome, sobrenome, endereco, cidade, estado, foto_perfil, sobre
    });

    // Atualiza campos específicos
    if (user.tipo_usuario === 'prestador') {
      await user.update({ experiencia, disponibilidade, whatsapp });
    } else if (user.tipo_usuario === 'empresa') {
      await user.update({ nicho, cultivo, regiao });
    }

    res.json({ message: 'Perfil atualizado com sucesso', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Gerenciar serviços do prestador (listar, criar, editar, deletar)
exports.getServices = async (req, res) => {
  try {
    const userId = req.userId;
    const services = await Service.findAll({ where: { usuario_id: userId } });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { nome_servico, categoria, descricao } = req.body;
    const service = await Service.create({
      usuario_id: req.userId,
      nome_servico,
      categoria,
      descricao
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({ where: { id, usuario_id: req.userId } });
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
    await service.destroy();
    res.json({ message: 'Serviço removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};