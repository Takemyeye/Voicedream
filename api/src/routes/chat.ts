import express, { Request, Response } from 'express';
import { getUserCredit, updateUserCredit } from '../service/userService';
import { saveStory } from '../story/storiesRepository';
import { askChatGPT } from '../aiAPI/gpt';

const router = express.Router();

router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  const { message, userId, min} = req.body;

  const credit = await getUserCredit(userId);
  
  if (!message || !userId || !min) {
    res.status(400).json({ error: 'Message/userId/Min is required' });
    return;
  }
  
  if(credit === null) {
      res.status(404).json({ error: 'User not found' });
    return;
  }

  if (credit < min) {
      res.status(400).json({ error: 'Yours credit is not sufficent'});
    return;
  }

  const characterCount: number = min * 130; // total characters

  try {
    const updatedCredit = credit - min;
    const reply = await askChatGPT(message, characterCount);
    await saveStory(reply, userId);
    await updateUserCredit(userId, updatedCredit);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' })        ;
  }
});

export default router;
