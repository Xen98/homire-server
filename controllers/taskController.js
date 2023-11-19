import Task from '../models/taskModel.js';

async function getTasks (req, res) {
  try {
    const tasks = await Task.getTasks();
    res.json({ tasks });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
}

export default {
  getTasks
};
