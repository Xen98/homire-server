import express from 'express';
import cors from 'cors';

import authenticateToken from './middlewares/authenticateToken.js';

import authRouter from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskCategoryRoutes from './routes/taskCategoryRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);

app.use('/tasks', authenticateToken, taskRoutes);

app.use('/task_categories', authenticateToken, taskCategoryRoutes);

app.use('/users', authenticateToken, userRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Escuchando el puerto 3000');
});
