import { AppDataSource } from '../../ormconfig';
import { User } from '../../entities/user';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = async (email: string, provider: string, password: string): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOne({ where: { email, provider } });

        if (!user || user.password !== password) {
            return null; 
        }

        return { userId: user.userId };
    } catch (error) {
        console.error('Error in authenticate:', error);
        throw new Error('Database error');
    }
};
