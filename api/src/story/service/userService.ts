import { AppDataSource } from '../../ormconfig';
import { User } from '../../entities/user';

// get credit from user 

export const getUserCredit = async (userId: number): Promise<number | null> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      return null;
    }

    return user.credit;
  } catch (error) {
    console.error('Error fetching user credit:', error);
    throw new Error('Database error');
  }
};

// update Credit after pay

export const updateUserCredit = async (userId: number, updatedCredit: number): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new Error('User not found');
    }

    user.credit = updatedCredit;

    await userRepository.save(user);
  } catch (error) {
    console.error('Error updating user credit:', error);
    throw new Error('Database error');
  }
};
