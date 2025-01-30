import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const askChatGPT = async (message: string, characterCount: number) => {
  try {
    const systemMessage = `
      Sei un assistente che racconta storie in modo chiaro. Quando ci sono più persone che raccontano la storia, usa le etichette come A:, B:, C: e così via per separare le voci di ogni persona. Se non è specificato il numero di persone o se ci sono meno di due persone, racconta semplicemente la storia senza etichette. Scrivi solo la storia senza altre frasi introduttive o commenti.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use "gpt-3.5-turbo" if necessary
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message + 'la lunghezza di storia deve contenere +-' + characterCount + 'parole' },
      ],
    });

    const reply = response.choices[0].message.content ?? '';
    
    return reply;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to communicate with ChatGPT.');
  }
};
