import TaskCategory from '../models/taskCategoryModel.js';

async function getTasksCategories (req, res) {
  try {
    const tasksCategories = await TaskCategory.getTasksCategories(req.user);
    res.json({ tasksCategories });
  } catch (error) {
    console.error('Error al obtener las categorías de tareas:', error);
    res.status(500).json({ error: 'Error al obtener las categorías de tareas' });
  }
}

export default {
  getTasksCategories
};
