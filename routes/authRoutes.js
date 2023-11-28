import express from 'express';

import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.validateUser);

router.post('/signup', userController.createUser);

router.post('/signup-member', userController.createMember);

export default router;
