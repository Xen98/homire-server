import Task from '../models/taskModel.js';

async function getTasks (req, res) {
  try {
    const tasks = await Task.getTasks(req.user);
    res.json({ tasks });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
}

async function updateTask (req, res) {
  try {
    const { id } = req.params;
    const { title, description, category_id, date, finishHour, completed } = req.body;

    console.log('Body: ', req.body);

    const task = await Task.updateTask(req.user, id, {
      title,
      description,
      category_id,
      date,
      finishHour,
      status: completed
    });

    res.json({ task });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
}

async function toggleCompleted (req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.toggleCompleted(req.user, id, status);

    res.json({ task });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
}

async function deleteTask (req, res) {
  try {
    const { id } = req.params;

    const task = await Task.deleteTask(req.user, id);

    res.json({ task });
  } catch (error) {
    console.error('Error al borrar la tarea:', error);
    res.status(500).json({ error: 'Error al borrar la tarea' });
  }
}

export default {
  getTasks,
  toggleCompleted,
  updateTask,
  deleteTask
};
