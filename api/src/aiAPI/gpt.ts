import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const askChatGPT = async (title: string, characterCount: number, nameCharacters: string, place: string, numberCharacters: number, argument: string) => {
  try {
    const systemMessage = `
      Sei un assistente che racconta storie in modo chiaro e dettagliato. Quando ci sono più persone che raccontano la storia, usa le etichette come A:, B:, C: e così via per separare le voci di ogni persona. Se ci sono meno di due persone o non è specificato il numero di persone, racconta semplicemente la storia senza etichette. Scrivi solo la storia, senza altre frasi introduttive o commenti.
    `;

    const userMessage = `
      Racconta la storia di "${title}" che si svolge nel luogo "${place}". La storia deve includere ${numberCharacters} personaggi, i cui nomi sono "${nameCharacters}". La trama della storia dovrebbe esplorare il tema o l'argomento "${argument}". La storia deve essere lunga circa ${characterCount} parole.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use "gpt-3.5-turbo" if necessary
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
    });

    const reply = response.choices[0].message.content ?? '';
    
    return reply;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to communicate with ChatGPT.');
  }
};
