const express = require('express');
const { createSchedule, getMySchedule, updateStatus } = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createSchedule);
router.get('/', authMiddleware, getMySchedule);
router.put('/:id/status', authMiddleware, updateStatus);

module.exports = router;