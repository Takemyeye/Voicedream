import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { saveUserStory } from '../repositories/userStoryRepository';
import { generateSpeech } from '../aiAPI/elevenLabs';
import { saveAudioFile } from '../service/download';
import { TTSController } from '../service/ttsControle';

dotenv.config();

const router = express.Router();

router.post('/tts', async (req: Request, res: Response) => {
  const { storyId, userId, voiceId } = req.body;

  if (!storyId || !userId) {
      res.status(400).json({ error: 'storyId e userId sono richieste' })
    return;
  }

  try {
    const story = await TTSController(storyId, userId);

    if (!story) {
        res.status(404).json({ error: 'errore durante ricerca di stria' })
      return;
    }

    
    const audioData = await generateSpeech(story);
        
    saveUserStory(story, userId, voiceId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.send(audioData);

    saveAudioFile(audioData);
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

export default router;
