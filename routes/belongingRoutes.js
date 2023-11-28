import express from 'express';

import belongingController from '../controllers/belongingController.js';

const router = express.Router();

router.get('/', belongingController.getBelongings);

router.post('/', belongingController.addBelonging);

router.patch('/:id', belongingController.updateBelonging);

router.delete('/:id', belongingController.deleteBelonging);

export default router;
