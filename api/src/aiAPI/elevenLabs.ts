import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

export const generateSpeech = async (story: string, voiceId: string): Promise<Buffer> => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: story,
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
        model_id: "eleven_multilingual_v2"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    console.error('Error generating speech for voiceId:', voiceId);
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error('Failed to generate speech');
  }
};
