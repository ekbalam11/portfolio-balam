import { Router } from 'express';
import type { RequestHandler } from 'express';

import * as indexControllers from '../controllers/index.controller';
import * as adminControllers from '../controllers/admin.controller';

const router = Router();

const setAdminView: RequestHandler = (req, res, next) => {
    res.locals.isAdmin = true;
    next();
};

router.use(setAdminView);

router.get('/', indexControllers.getHome);
router.get('/new-photo', adminControllers.getNewPhotoForm);
router.post('/new-photo', adminControllers.postNewPhoto);

export default router;