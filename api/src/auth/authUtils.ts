import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (user: User): string => {
  return jwt.sign({ id: user.userId, email: user.email, provider: user.provider }, JWT_SECRET);
};

export const findOrCreateUser = async (
  email: string,
  provider: string,
  userData: Partial<User>
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    let user = await userRepository.findOne({ where: { email, provider } });

    if (!user) {
      user = new User();
      user.username = userData.username || 'Anonymous';
      user.credit = 50;
      user.email = email;
      user.avatar = userData.avatar || '';
      user.provider = provider;
      user.token = generateToken(user);
    } else {
      if (!user.token) {
        user.token = generateToken(user);
      }
    }

    await userRepository.save(user);

    return user;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw new Error('Database error');
  }
};
