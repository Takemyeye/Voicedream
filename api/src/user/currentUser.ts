import { Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

interface DecodedToken extends JwtPayload {
    userId: string;
}

router.get('/current_user', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, JWT_SECRET, async (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const decodedToken = decoded as DecodedToken; 

        try {
            const userId = decodedToken.userId;
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { userId } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { userId: _, ...userWithoutId } = user;
            res.json(userWithoutId);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
});

export default router;
