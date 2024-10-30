const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controller.js');

router.get('/', indexControllers.getHome);
router.get('/portfolio', indexControllers.getPhotos)


module.exports = router;