const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth.controller');

router.get('/login', authControllers.getLoginForm);
router.post('/login', authControllers.postLoginForm);
router.get('/logout', authControllers.logout);

module.exports = router;