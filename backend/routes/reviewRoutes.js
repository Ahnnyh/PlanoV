const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware'); // caminho correto

// Rotas públicas (GET)
router.get('/:avaliado_id', reviewController.getReviewsByAvaliado);

// Rotas protegidas (POST, PUT, DELETE)
router.post('/', authMiddleware, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;