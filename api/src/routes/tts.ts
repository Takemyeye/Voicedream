import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { saveUserStory } from '../repositories/userStoryRepository';
import { generateSpeech } from '../aiAPI/elevenLabs';
import { saveAudioFile } from '../service/download';
import { TTSController } from '../service/ttsControle';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';

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

    console.log('result:', result);

    const audioData = await generateSpeech(result?.story, result.voiceId);
    const userStoryId = saveAudioFile(audioData);
    
    saveUserStory(userStoryId, userId, result.voiceId, storyId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.send(audioData);
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

export default router;
