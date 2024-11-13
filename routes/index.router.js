const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controller.js');

router.get('/', indexControllers.getHome);
router.get('/data-portfolio', indexControllers.getDataPortfolio)
router.get('/portfolio', indexControllers.getPhotos);
router.get('/download-CV', indexControllers.getCV)
router.post('/new-message', indexControllers.postMessage)


module.exports = router;