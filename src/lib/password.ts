import { hash } from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
  const salt = parseInt(process.env.SALTROUND);

  if (!salt) return undefined;
  return await hash(plainPassword, salt);
};
