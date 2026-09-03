const { Router } = require('express');
const indexControllers = require('../controllers/index.controller.js');

const router = Router();

router.get('/', indexControllers.getHome);
router.get('/data-portfolio', indexControllers.getDataPortfolio)
router.get('/portfolio', indexControllers.getPhotos);
router.get('/download-CV', indexControllers.getCV)
router.post('/new-message', indexControllers.postMessage)

module.exports = router;