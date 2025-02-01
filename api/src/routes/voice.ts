import express, { Request, Response } from 'express';
import { saveVoice } from '../repositories/voiceRepository';
import FormData from 'form-data';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

dotenv.config();
const router = express.Router();
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVEN_LABS_VOICE_URL = 'https://api.elevenlabs.io/v1/voices/add';
const DEFAULT_AUDIO_PATH = path.join(process.cwd(), 'audio', 'oleh.mp3');

router.post('/voice', async (req: Request, res: Response) => {
  const { userId, voiceName} = req.body;


  try {

    if (!fs.existsSync(DEFAULT_AUDIO_PATH)) {
      res.status(400).json({ error: 'Default audio file is missing' });
    return;
  }    

    const formData = new FormData();
    formData.append('files[]', fs.createReadStream(DEFAULT_AUDIO_PATH));
    formData.append('name', 'New Voice');
    formData.append('description', 'Custom AI Voice');

    const response = await axios.post(ELEVEN_LABS_VOICE_URL, formData, {
      headers: { ...formData.getHeaders(), 'xi-api-key': ELEVENLABS_API_KEY }
    });

    const voiceId = response.data.voice_id
    saveVoice(userId, voiceName, voiceId)

    res.json("Voice");
  } catch (error: any) {
    res.status(500).json({ error: 'Error registering voice', details: error.response?.data });
  }
});

export default router;
