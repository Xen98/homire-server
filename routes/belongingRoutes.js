import express from 'express';

import belongingController from '../controllers/belongingController.js';

const router = express.Router();

router.get('/', belongingController.getBelongings);

export default router;
