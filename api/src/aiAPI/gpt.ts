import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const askChatGPT = async (
  title: string,
  characterCount: number,
  nameCharacters: string,
  place: string,
  wordCount: number,
  argument: string,
  script: boolean
) => {
  try {
    const systemMessage = script
      ? `
    Sei un assistente che scrive sceneggiature. Quando ci sono più personaggi, usa solo le etichette A:, B:, C: e così via per indicare chi sta parlando. Scrivi il copione senza descrizioni tra parentesi, senza titoli o morale finale, solo i dialoghi diretti.
    
    **Formato esempio:**
    A: Ciao, come va?  
    B: Bene, grazie! E tu?  
    A: Sto cercando di capire cosa fare oggi.  

    Non aggiungere frasi introduttive o spiegazioni, solo i dialoghi.
  `
      : `
    Sei un assistente che racconta storie in modo chiaro e dettagliato. Racconta la storia come un narratore, senza usare etichette per i personaggi. Scrivi solo la storia senza introduzioni o commenti.
  `;

    let story = '';
    let currentLength = 0;

    // Loop to generate parts of the story until it reaches the desired character count
    while (currentLength < characterCount) {
      const userMessage = script
        ? `
        Scrivi una sceneggiatura per una storia con ${wordCount} personaggi: ${nameCharacters}.  
        La storia si svolge a ${place} e tratta il tema ${argument}.  
        Deve essere lunga circa ${Math.min(characterCount - currentLength, 300)} parole.  

        Scrivi solo il copione in questo formato:  

        A: Cosa sta succedendo?  
        B: Non lo so, ma dobbiamo muoverci in fretta!  
        C: D'accordo, seguitemi!  

        Non usare parentesi, non aggiungere descrizioni o titoli.
      `
        : `
        Racconta la storia di "${title}" che si svolge nel luogo "${place}".  
        La storia deve includere ${wordCount} personaggi principali, i cui nomi sono "${nameCharacters}".  
        La trama della storia dovrebbe esplorare il tema "${argument}".  
        La storia deve essere lunga circa ${Math.min(characterCount - currentLength, 300)} parole e raccontata dal punto di vista di un narratore.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
      });

      const part = response.choices[0].message.content ?? '';
      story += part;
      currentLength += part.length;
    }

    return story;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to communicate with ChatGPT.');
  }
};
