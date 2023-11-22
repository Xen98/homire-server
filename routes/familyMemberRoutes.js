import express from 'express';
import familyMemberController from '../controllers/familyMemberController.js';

const router = express.Router();

router.get('/', familyMemberController.getFamilyMembers);

export default router;
