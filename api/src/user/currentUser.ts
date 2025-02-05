import { Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface DecodedToken extends JwtPayload {
  email: string;
  provider: string;
}

router.get('/current_user', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: decoded.email, provider: decoded.provider },
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
