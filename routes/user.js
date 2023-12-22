const express = require('express');
const router = express.Router();
const { createUser, verify, login, forgotPassword, resetPassword } = require('../controllers/user');

router.post('/register', createUser);
router.post('/verify', verify);
router.post('/login', login);
router.patch('/forgot/password', forgotPassword);
router.patch('/reset/password', resetPassword);
module.exports = router;