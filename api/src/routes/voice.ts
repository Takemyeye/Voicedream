import express, { Request, Response } from 'express';
import { saveVoice } from '../repositories/voiceRepository';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';

dotenv.config();
const router = express.Router();
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVEN_LABS_VOICE_URL = 'https://api.elevenlabs.io/v1/voices/add';
const DEFAULT_AUDIO_PATH = path.join(process.cwd(), 'audio', 'oleh.mp3');

router.post('/voice', async (req: Request, res: Response) => {
  const { userId, voiceName } = req.body;

  try {
    if (!fs.existsSync(DEFAULT_AUDIO_PATH)) {
      res.status(400).json({ error: 'Default audio file is missing' });
      return;
    }

    const audioStream = fs.createReadStream(DEFAULT_AUDIO_PATH);

    console.log('body:', req.body)

    if (!voiceName) {
      res.status(400).json({ error: 'Voice name is required' });
      return;
    }

    const form = new FormData();
    form.append('name', voiceName);
    form.append('files', audioStream); 
    form.append('remove_background_noise', 'false');  
    form.append('description', 'Custom AI Voice'); 

    const headers = {
      ...form.getHeaders(),
      'xi-api-key': ELEVENLABS_API_KEY
    };

    const response = await axios.post(ELEVEN_LABS_VOICE_URL, form, { headers });

    const voiceId = response.data.voice_id;
    saveVoice(voiceName, voiceId, userId );

    res.json({ message: 'Voice successfully registered', voiceId });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: 'Error registering voice',
      details: error.response?.data?.detail || error.message || 'Unknown error'
    });
  }
});

export default router;
