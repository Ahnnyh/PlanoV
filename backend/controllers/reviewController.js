// Importação direta dos modelos (sem depender do index.js)
const Review = require('../models/Review');
const User = require('../models/User');

exports.getReviewsByAvaliado = async (req, res) => {
  try {
    const { avaliado_id } = req.params;
    const reviews = await Review.findAll({
      where: { avaliado_id },
      include: [{
        model: User,
        as: 'avaliador',
        attributes: ['id', 'nome', 'foto_perfil']
      }],
      order: [['criado_em', 'DESC']]
    });
    const total = reviews.length;
    const media = total > 0 ? reviews.reduce((acc, r) => acc + r.nota, 0) / total : 0;
    res.json({ reviews, media, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { avaliado_id, nota, comentario } = req.body;
    const avaliador_id = req.userId;
    const existing = await Review.findOne({ where: { avaliador_id, avaliado_id } });
    if (existing) {
      return res.status(400).json({ error: 'Você já avaliou este usuário' });
    }
    const review = await Review.create({
      avaliador_id,
      avaliado_id,
      nota,
      comentario
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentario } = req.body;
    const userId = req.userId;
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ error: 'Avaliação não encontrada' });
    if (review.avaliador_id !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para editar esta avaliação' });
    }
    await review.update({ nota, comentario });
    res.json({ message: 'Avaliação atualizada', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ error: 'Avaliação não encontrada' });
    if (review.avaliador_id !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta avaliação' });
    }
    await review.destroy();
    res.json({ message: 'Avaliação removida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};