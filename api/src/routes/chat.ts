import express, { Request, Response } from 'express';
import { getUserCredit, updateUserCredit } from '../service/userService';
import { saveStory } from '../repositories/storiesRepository';
import { askChatGPT } from '../aiAPI/gpt';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';

const router = express.Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { story, token, min, nameCharacters, place, numberCharacters, argument } = req.body;
  
  const user = await verifyTokenAndGetUser(token);
  const userId = user;
  
  try {
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const credit = await getUserCredit(userId);

    if (!story || !min) {
      res.status(400).json({ error: 'Story and min are required' });
      return;
    }

    if (credit === null) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (credit < min) {
      res.status(400).json({ error: 'Insufficient credits' });
      return;
    }

    const characterCount: number = min * 150;

    const updatedCredit = credit - min;
    const reply = await askChatGPT(story, characterCount, nameCharacters, place, numberCharacters, argument);
    
    await saveStory(reply, userId);
    await updateUserCredit(userId, updatedCredit);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default router;
