import { Router } from 'express';
import type { Request, Response } from 'express';

import * as indexControllers from '../controllers/index.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    indexControllers.getHome(req, res);
});

router.get('/data-portfolio', (req: Request, res: Response) => {
    indexControllers.getDataPortfolio(req, res);
});

router.get('/portfolio', (req: Request, res: Response) => {
    indexControllers.getPhotos(req, res);
});

router.get('/download-CV', (req: Request, res: Response) => {
    indexControllers.getCV(req, res);
});

router.post('/new-message', (req: Request, res: Response) => {
    indexControllers.postMessage(req, res);
});

export default router;