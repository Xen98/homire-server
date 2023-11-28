import BelongingCategory from '../models/belongingCategoryModel.js';

async function getBelongingCategories (req, res) {
  try {
    const belongingsCategories = await BelongingCategory.getBelongingsCategories(req.user);
    res.json({ belongingsCategories });
  } catch (error) {
    console.error('Error al obtener las categorías de las pertenencias:', error);
    res.status(500).json({ error: 'Error al obtener las categorías de las pertenencias' });
  }
}

export default {
  getBelongingCategories
};
