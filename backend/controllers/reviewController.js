const Review = require('../models/Review');
const User = require('../models/User');

exports.createReview = async (req, res) => {
  try {
    const { avaliado_id, nota, comentario } = req.body;
    const avaliador_id = req.userId;

    if (avaliador_id === avaliado_id) return res.status(400).json({ error: 'Não pode avaliar a si mesmo' });

    const review = await Review.create({ avaliador_id, avaliado_id, nota, comentario });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { targetId } = req.params;
    const reviews = await Review.findAll({
      where: { avaliado_id: targetId },
      include: [{ model: User, as: 'avaliador', attributes: ['id', 'nome', 'sobrenome', 'foto_perfil'] }],
      order: [['criado_em', 'DESC']]
    });
    const media = reviews.reduce((acc, r) => acc + r.nota, 0) / (reviews.length || 1);
    res.json({ media: media.toFixed(1), total: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};