import express, { Request, Response } from 'express';
import { TTSController } from '../service/ttsControle';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import { separateStory } from '../utils/storyParser';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/ttsScript', async (req: Request, res: Response) => {
  const { storyId, token, voices } = req.body;
  console.log(req.body);

  const userId = await verifyTokenAndGetUser(token);

  if (!storyId || !voices || !userId) {
    res.status(400).json({ error: 'Story, user, and voices are required' });
    return;
  }

  try {
    const result = await TTSController(storyId, userId);

    if(!result) {
        res.status(404).json({ error: "Result no va bene"});
        return;
    }

    console.log("result:", result);

    const parser = separateStory(result.story || '');

    console.log("parser:", parser);

    res.status(200).json({ message: 'Speech generation process started for all selected voices' });

  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

export default router;
