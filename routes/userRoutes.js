import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', userController.getUser);

export default router;
