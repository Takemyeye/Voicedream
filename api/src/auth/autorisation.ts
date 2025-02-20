import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';
import dotenv from 'dotenv';

dotenv.config();

export const autorisation = async (email: string, provider: string, password: string, username?: string) => {
    try{

        const userRepository = AppDataSource.getRepository(User);

        let user = await userRepository.findOne({ where: { email, provider } });

        if (!user) {
          user = new User();
          user.username = username || '';
          user.email = email;
          user.avatar = '';
          user.provider = provider;
          user.password = password;
          
          await userRepository.save(user);
        }
        
        return {
          userId: user.userId
        };
        

    } catch (error) {
        console.error('Error in autorisation:', error);
        throw new Error('Database error');
      }
}
