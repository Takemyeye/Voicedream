import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/user';
import { AppDataSource } from '../ormconfig';

const JWT_SECRET = process.env.JWT_SECRET || '';

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const verifyTokenAndGetUser = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    console.log("decoded:", decoded)

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { userId: decoded.userId },
    });

    if (!user) {
      return;
    }

    return user.userId;
  } catch (error) {
    console.error(error);
    return;
  }
};
