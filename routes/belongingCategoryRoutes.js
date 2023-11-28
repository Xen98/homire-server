import express from 'express';
import belongingCategoryController from '../controllers/belongingCategoryController.js';

const router = express.Router();

router.get('/', belongingCategoryController.getBelongingCategories);

export default router;
