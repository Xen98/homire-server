export function generateFamilyCode (length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const caracteresLength = caracteres.length;

  let codigo = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * caracteresLength);
    codigo += caracteres.charAt(randomIndex);
  }

  return codigo;
}
