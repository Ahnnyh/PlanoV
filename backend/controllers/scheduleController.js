const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.createSchedule = async (req, res) => {
  try {
    const { prestador_id, empresa_id, tipo_servico, descricao, inicio, fim } = req.body;
    const usuarioLogadoId = req.userId;
    
    // Buscar o tipo do usuário logado
    const usuarioLogado = await User.findByPk(usuarioLogadoId);
    if (!usuarioLogado) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    let finalPrestadorId = null;
    let finalEmpresaId = null;
    
    if (usuarioLogado.tipo_usuario === 'prestador') {
      // PRESTADOR: ele é o prestador, precisa de uma empresa
      if (!empresa_id) {
        return res.status(400).json({ error: 'Prestador precisa informar a empresa_id' });
      }
      finalPrestadorId = usuarioLogadoId;
      finalEmpresaId = parseInt(empresa_id);
    } else {
      // EMPRESA: ela é a empresa, precisa de um prestador
      if (!prestador_id) {
        return res.status(400).json({ error: 'Empresa precisa informar o prestador_id' });
      }
      finalPrestadorId = parseInt(prestador_id);
      finalEmpresaId = usuarioLogadoId;
    }
    
    // Verificar se o prestador existe
    const prestador = await User.findOne({ 
      where: { id: finalPrestadorId, tipo_usuario: 'prestador' } 
    });
    if (!prestador) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }
    
    const appointment = await Appointment.create({
      prestador_id: finalPrestadorId,
      empresa_id: finalEmpresaId,
      tipo_servico,
      descricao,
      inicio,
      fim,
      status: 'agendado'
    });
    
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMySchedule = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    let appointments;

    if (user.tipo_usuario === 'prestador') {
      appointments = await Appointment.findAll({
        where: { prestador_id: userId },
        include: [
          { model: User, as: 'empresa', attributes: ['id', 'nome', 'sobrenome', 'cidade'] }
        ],
        order: [['inicio', 'ASC']]
      });
    } else {
      appointments = await Appointment.findAll({
        where: { empresa_id: userId },
        include: [
          { model: User, as: 'prestador', attributes: ['id', 'nome', 'sobrenome', 'cidade', 'whatsapp'] }
        ],
        order: [['inicio', 'ASC']]
      });
    }
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });

    // Somente o prestador ou a empresa envolvidos podem alterar status
    if (appointment.prestador_id !== req.userId && appointment.empresa_id !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }
    await appointment.update({ status });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Buscar agendamento por ID (para edição)
exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: User, as: 'prestador', attributes: ['id', 'nome', 'sobrenome'] },
        { model: User, as: 'empresa', attributes: ['id', 'nome', 'sobrenome'] }
      ]
    });
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    
    // Verificar se o usuário logado tem permissão
    if (appointment.prestador_id !== req.userId && appointment.empresa_id !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar agendamento
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_servico, descricao, inicio, fim } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    
    // Verificar se o usuário logado tem permissão
    if (appointment.prestador_id !== req.userId && appointment.empresa_id !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }
    
    await appointment.update({ tipo_servico, descricao, inicio, fim });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir agendamento
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    
    // Verificar se o usuário logado tem permissão
    if (appointment.prestador_id !== req.userId && appointment.empresa_id !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }
    
    await appointment.destroy();
    res.json({ message: 'Agendamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};