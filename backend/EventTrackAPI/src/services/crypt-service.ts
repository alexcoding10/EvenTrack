import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config/config';



export async function hashPassword(password:string): Promise<string>{
    return await bcrypt.hashSync(password,SALT_ROUNDS)
}
export async function validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }