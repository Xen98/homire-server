import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', taskController.getTasks);

router.post('/', taskController.addTask);

router.patch('/:id', taskController.updateTask);

router.patch('/status/:id', taskController.toggleCompleted);

router.delete('/:id', taskController.deleteTask);

export default router;
