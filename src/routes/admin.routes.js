const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controller');
const adminControllers = require('../controllers/admin.controller');

router.use((req, res, next) => {
    res.locals.isDamin = true;
    next()
});

router.get('/', indexControllers.getHome);
router.get('/new-photo', adminControllers.getNewPhotoForm);
router.post('/new-photo', adminControllers.postNewPhoto);

module.exports = router;