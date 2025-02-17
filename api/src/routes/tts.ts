import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { saveUserStory } from '../repositories/userStoryRepository';
import { generateSpeech } from '../aiAPI/elevenLabs';
import { saveAudioFile } from '../service/download';
import { TTSController } from '../service/ttsControle';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();

router.post('/tts', async (req: Request, res: Response) => {
  const { storyId, token, voiceId } = req.body;

  const userId = await verifyTokenAndGetUser(token);

  if (!storyId || !userId || !voiceId) {
    res.status(400).json({ error: 'story, user e voice sono richieste' });
    return;
  }

  try {
    const result = await TTSController(storyId, userId, voiceId);

    if (!result?.story || !result?.voiceId) {
      res.status(404).json({ error: 'errore durante ricerca di storia' });
      return;
    }

    const audioData = await generateSpeech(result.story, result.voiceId);

    const userStoryDir = path.join(__dirname, '../..', 'userStory');
    if (!fs.existsSync(userStoryDir)) {
      fs.mkdirSync(userStoryDir, { recursive: true });
    }

    const userStoryId = saveAudioFile(audioData);
    
    const audioFilePath = path.join(userStoryDir, `${userStoryId}.mp3`);
    
    fs.writeFileSync(audioFilePath, audioData);

    saveUserStory(userStoryId, userId, result.voiceId, storyId);

    res.status(200).json({ fileId: userStoryId });
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

router.get('/audio/:fileId', async (req: Request, res: Response) => {
  const { fileId } = req.params;
  const userStoryDir = path.join(__dirname, '../..', 'userStory');
  const audioFilePath = path.join(userStoryDir, `${fileId}.mp3`);

  if (fs.existsSync(audioFilePath)) {
    res.setHeader('Content-Type', 'audio/mp3');
    fs.createReadStream(audioFilePath).pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

export default router;
