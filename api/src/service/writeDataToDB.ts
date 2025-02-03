import express, { Request, Response } from 'express';
import { saveVoice } from '../repositories/voiceRepository';

const router = express.Router();

router.post('/save', async (req: Request, res: Response): Promise<void> => {
  const { userId, voiceId, voiceName } = req.body;

  if (!userId || !voiceId || !voiceName) {
    res.status(400).json({ error: 'userId, voiceId, and voiceName are required' });
    return;
  }

  try {
    const response = await saveVoice(voiceName, voiceId, userId);

    res.json({ response });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Something went wrong.' });
    } } 
});

export default router;
