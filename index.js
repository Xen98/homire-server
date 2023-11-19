import express from 'express';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/tasks', taskRoutes);

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Escuchando el puerto 3000');
});
