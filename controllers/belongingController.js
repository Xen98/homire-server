import belongingModel from '../models/belongingModel.js';

async function getBelongings (req, res) {
  try {
    const belongings = await belongingModel.getBelongings(req.user);
    res.json({ belongings });
  } catch (error) {
    console.error('Error al obtener los pertenencias:', error);
    res.status(500).json({ error: 'Error al obtener los pertenencias' });
  }
}

async function addBelonging (req, res) {
  try {
    const { name, image, categoryId, userId } = req.body;

    const { id } = await belongingModel.addBelonging(req.user, {
      name,
      image,
      categoryId,
      userId
    });

    res.json({ id });
  } catch (error) {
    console.error('Error al agregar la pertenencia:', error);
    res.status(500).json({ error: 'Error al agregar la pertenencia' });
  }
}

async function updateBelonging (req, res) {
  try {
    const { id } = req.params;
    const { name, image, categoryId, userId } = req.body;

    const task = await belongingModel.updateBelonging(req.user, id, {
      name,
      image,
      categoryId,
      userId
    });

    res.json({ task });
  } catch (error) {
    console.error('Error al actualizar la pertenencia:', error);
    res.status(500).json({ error: 'Error al actualizar la pertenencia' });
  }
}

async function deleteBelonging (req, res) {
  try {
    const { id } = req.params;

    const task = await belongingModel.deleteBelonging(req.user, id);

    res.json({ task });
  } catch (error) {
    console.error('Error al borrar la pertenencia:', error);
    res.status(500).json({ error: 'Error al borrar la pertenencia' });
  }
}

export default {
  getBelongings,
  addBelonging,
  updateBelonging,
  deleteBelonging
};
