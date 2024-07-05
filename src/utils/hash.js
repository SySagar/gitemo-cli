import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
}

export async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
}
