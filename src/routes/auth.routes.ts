import { Router } from 'express';

import * as authControllers from '../controllers/auth.controller';

const router = Router();

router.get('/login', authControllers.getLoginForm);
router.post('/login', authControllers.postLoginForm);
router.get('/logout', authControllers.logout);

export default router;