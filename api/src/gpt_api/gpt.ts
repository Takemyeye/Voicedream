import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

console.log('env', process.env.OPENAI_API_KEY);

export const askChatGPT = async (message: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use "gpt-3.5-turbo" if necessary
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content ?? '';
    return reply;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to communicate with ChatGPT.');
  }
};
