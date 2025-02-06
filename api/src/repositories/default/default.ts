import express from "express";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { Voice } from "../../entities/voice";
import { verifyTokenAndGetUser } from '../../utils/tokenUtils';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

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
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const userId = await verifyTokenAndGetUser(token);
        
        const voicesRepository = AppDataSource.getRepository(Voice);
        const voices = await voicesRepository.find({
            where: [
                { default: true },
                { userId: userId }
            ]
        });

        if (!voices || voices.length === 0) {
            res.status(404).json({ error: 'No voices found' });
            return;
        }

        const userVoiceDir = path.join(__dirname, 'userVoice');
        const voicesWithFiles = voices.map((voice) => {
            const audioFilePath = path.join(userVoiceDir, `${voice.voiceId}.mp3`);

            if (fs.existsSync(audioFilePath)) {
                return {
                    ...voice,
                    audioFile: `/api/voice/${voice.voiceId}`  
                };
            }

            return { ...voice, audioFile: null };
        });

        res.json({ voices: voicesWithFiles });
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({
            error: "An error occurred while fetching voices"
        });
    }
});

router.get('/voice/:voiceId', (req, res) => {
    const { voiceId } = req.params;
    const userVoiceDir = path.join(__dirname, "../..", "userVoice");
    const audioFilePath = path.join(userVoiceDir, `${voiceId}.mp3`);

    if (fs.existsSync(audioFilePath)) {
        res.setHeader('Content-Type', 'audio/mp3');
        res.sendFile(audioFilePath);
    } else {
        res.status(404).json({ error: 'Audio file not found' });
    }
});

export default router;

