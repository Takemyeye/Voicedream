import { Router } from 'express';
import { AppDataSource } from '../ormconfig';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import { User } from '../entities/user';

const router = Router();

router.get('/current_user', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized current user ' });
    return;
  }

  try {
    const userId = await verifyTokenAndGetUser(token);

    if (!userId) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { userId: userId },
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
