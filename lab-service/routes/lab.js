const express = require('express');
const router = express.Router();
const signup = require('../lab-auth/signup');
const login = require('../lab-auth/auth');
const labProfile = require('../lab-profile/profile');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/lab/signup', signup);
router.post('/lab/login', login);
router.get('/lab/profile', authMiddleware, labProfile)
module.exports = router;