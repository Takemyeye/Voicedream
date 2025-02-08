import express, { Request, Response } from 'express';
import { getUserCredit, updateUserCredit } from '../service/userService';
import { saveStory } from '../repositories/storiesRepository';
import { askChatGPT } from '../aiAPI/gpt';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';

const router = express.Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { title, token, min, nameCharacters, place, numberCharacters, argument } = req.body;
  
  const userId = await verifyTokenAndGetUser(token);
  
  if(!userId) {
    res.status(400).json({ error: "User not found" })
    return;
  }
  
  try {

    const credit = await getUserCredit(userId);

    if (!title || !min) {
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
    const reply = await askChatGPT(title, characterCount, nameCharacters, place, numberCharacters, argument);
    
    await saveStory(reply, userId, title, min, argument, place);
    await updateUserCredit(userId, updatedCredit);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default router;
