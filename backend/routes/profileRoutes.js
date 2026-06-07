const express = require('express');
const {
  getPublicProfile,
  updateProfile,
  getServices,
  createService,
  deleteService
} = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', getPublicProfile);
router.put('/', authMiddleware, updateProfile);
router.get('/services', authMiddleware, getServices);
router.post('/services', authMiddleware, createService);
router.delete('/services/:id', authMiddleware, deleteService);

module.exports = router;