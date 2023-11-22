import express from 'express';
import taskCategoryController from '../controllers/taskCategoryController.js';

const router = express.Router();

router.get('/', taskCategoryController.getTasksCategories);

export default router;
