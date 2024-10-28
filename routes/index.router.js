const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controller.js');

router.get('/', indexControllers.getHome)


module.exports = router;