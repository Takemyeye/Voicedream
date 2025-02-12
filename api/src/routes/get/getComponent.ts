import express from "express";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { verifyTokenAndGetUser } from '../../utils/tokenUtils';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/getStoryUser', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const userId = await verifyTokenAndGetUser(token);

    try {
        const userRepository = AppDataSource.getRepository(Stories);
        const stories = await userRepository.find({where: { userId: userId }});
         
         if (stories.length === 0 || !stories) {
            res.status(404).json({ error: 'Story not found' });
            return;
        }2

    res.json({ stories });
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({
        });
    }
});

export default router;
