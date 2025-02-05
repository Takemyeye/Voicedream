import express, { Request, Response } from "express";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { Voice } from "../../entities/voice";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/getStory', async (req: Request, res: Response) => {

    try {
        const userRepository = AppDataSource.getRepository(Stories);
        const stories = await userRepository.find({where: { default: true, userId: 'default' },});

        if ( !stories ) {
            res.status(404).json({ error: 'Story not found' });
            return;
        }

    res.json({ stories });
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({
        });
    }

});

router.get('/getVoice', async (req: Request, res: Response) => {

    try {
        const userRepository = AppDataSource.getRepository(Voice);
        const voices = await userRepository.find({where: { default: true, userId: 'default' },});

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

