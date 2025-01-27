import express, { Request, Response } from 'express';
import { askChatGPT } from '../gpt_api/gpt';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  if (!message) {
        res.status(400).json({ error: 'Message is required' })
    return;
  }

  try {
    const reply = await askChatGPT(message);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' })        ;
  }
});

export default router;
