const express = require('express');
const { createSchedule, getMySchedule, updateStatus, getScheduleById, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createSchedule);
router.get('/', authMiddleware, getMySchedule);
router.get('/:id', authMiddleware, getScheduleById);        // ← NOVA: buscar um agendamento específico
router.put('/:id/status', authMiddleware, updateStatus);
router.put('/:id', authMiddleware, updateSchedule);         // ← NOVA: editar agendamento
router.delete('/:id', authMiddleware, deleteSchedule);      // ← NOVA: excluir agendamento

module.exports = router;