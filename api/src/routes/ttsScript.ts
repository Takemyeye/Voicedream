import express, { Request, Response } from 'express';
import { saveUserStory } from '../repositories/userStoryRepository';
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import { TTSController } from '../service/ttsControle';
import { VoiceIdUpdater } from '../utils/voiceParser';
import { generateSpeech } from '../aiAPI/elevenLabs';
import { separateStory } from '../utils/storyParser';
import { saveAudioFile } from '../service/download';
import { storyUnite } from '../utils/scriptVoices';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();

// path
const userStoryDir = path.join(__dirname, '../..', 'userStory');
if (!fs.existsSync(userStoryDir)) {
    fs.mkdirSync(userStoryDir, { recursive: true });
}

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

    if (!result || !result?.story) {
      res.status(404).json({ error: 'Result not found' });
      return;
    }

    const parser = separateStory(result.story || '');

    const voiceIdUpdater = new VoiceIdUpdater(voices);
    const updatedParser = voiceIdUpdater.updateParserWithVoiceIds(parser);

    const audioChunks: Buffer[] = [];

    for (const { character, line } of updatedParser) {
      const voiceId = character;
      console.log(`Generating speech for voiceId: ${voiceId}, text: "${line}"`);

      try {
        const audioData = await generateSpeech(line, voiceId);

        if (!audioData || audioData.length === 0) {
          console.warn(`Skipping empty audio for line: "${line}"`);
          continue;
        }

        audioChunks.push(audioData);

      } catch (error) {
        console.error(`Error generating speech for line "${line}":`, error);
      }
    }

    if (audioChunks.length === 0) {
      res.status(500).json({ error: 'Failed to generate any speech' });
      return;
    }

    const finalAudio = await storyUnite(audioChunks);

    const userStoryId = saveAudioFile(finalAudio);

    const audioFilePath = path.join(userStoryDir, `${userStoryId}.mp3`);
    fs.writeFileSync(audioFilePath, finalAudio);

    saveUserStory(userStoryId, userId, voices, storyId);

    res.status(200).json({ message: 'Speech generation completed', userStoryId });

  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

export default router;
