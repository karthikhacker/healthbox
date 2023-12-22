const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile, getReport } = require('../controllers/profile');

router.get('/profile', authMiddleware, getProfile);
router.put('/update/profile', authMiddleware, updateProfile);
router.get('/report', authMiddleware, getReport);
module.exports = router;