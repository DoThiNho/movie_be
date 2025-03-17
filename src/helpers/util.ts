import * as bcrypt from 'bcryptjs';
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  password: string,
  userPassword: string,
) => {
  try {
    const isValidPassword = await bcrypt.compare(password, userPassword);
    return isValidPassword;
  } catch (error) {
    console.log(error);
  }
};
