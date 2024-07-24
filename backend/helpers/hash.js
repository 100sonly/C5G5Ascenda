const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const comparePassword = async (password, hashed) => {
  try {
    return await bcrypt.compare(password, hashed);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = {
    hashPassword,
    comparePassword
}