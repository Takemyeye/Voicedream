import express from "express";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { Voice } from "../../entities/voice";
import { verifyTokenAndGetUser } from '../../utils/tokenUtils';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/getStory', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const userId = await verifyTokenAndGetUser(token);

    try {
        const userRepository = AppDataSource.getRepository(Stories);
        const stories = await userRepository.find({
            select: ["story", "title"],
            where: [
            { default: true },
            { userId: userId }
        ]
         });
         
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

router.get('/getVoice', async (req, res) => {
    const { token } = req.body

    const userId = await verifyTokenAndGetUser(token);

    try {
        const userRepository = AppDataSource.getRepository(Voice);
        const voices = await userRepository.find({where: { default: true || userId },});

        if ( !voices ) {
            res.status(404).json({ error: 'Voice not found' });
            return;
        }

    res.json({ voices });
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({
        });
    }
});


export default router;

