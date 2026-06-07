const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.createSchedule = async (req, res) => {
  try {
    const { prestador_id, tipo_servico, descricao, inicio, fim } = req.body;
    const empresa_id = req.userId;

    // Verificar se prestador existe
    const prestador = await User.findOne({ where: { id: prestador_id, tipo_usuario: 'prestador' } });
    if (!prestador) return res.status(404).json({ error: 'Prestador não encontrado' });

    const appointment = await Appointment.create({
      prestador_id,
      empresa_id,
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