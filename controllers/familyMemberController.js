import familyMemberModel from '../models/familyMemberModel.js';

async function getFamilyMembers (req, res) {
  try {
    const familyMembers = await familyMemberModel.getFamilyMembers(req.user);
    res.json({ familyMembers });
  } catch (error) {
    console.error('Error al obtener los miembros de la familia:', error);
    res.status(500).json({ error: 'Error al obtener los miembros de la familia' });
  }
}

export default {
  getFamilyMembers
};
