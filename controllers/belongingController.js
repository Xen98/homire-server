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

export default {
  getBelongings
};
