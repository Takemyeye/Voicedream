import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';
import dotenv from 'dotenv';

dotenv.config();

export const findOrCreateUser = async (email: string, provider: string, userData: Partial<User>) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    let user = await userRepository.findOne({ where: { email, provider } });

    if (!user) {
      user = new User();
      user.username = userData.username || 'Anonymous';
      user.email = email;
      user.avatar = userData.avatar || '';
      user.provider = provider;
      
      await userRepository.save(user);
    }

    return {
      userId: user.userId,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      provider: user.provider,
      credit: user.credit,
    };
    
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw new Error('Database error');
  }
};
