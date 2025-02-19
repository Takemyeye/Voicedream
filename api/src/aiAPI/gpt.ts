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
  script: boolean,
  min: number
) => {
  try {
    const systemMessage = script
      ? `
    Sei un assistente che scrive sceneggiature. Quando ci sono più personaggi, usa solo le etichette A:, B:, C: e così via per indicare chi sta parlando. Scrivi il copione senza descrizioni tra parentesi, senza titoli o morale finale, solo i dialoghi diretti.

    Non aggiungere frasi introduttive o spiegazioni, solo i dialoghi. Il narratore deve solo introdurre e concludere la storia.
  `
      : `
    Sei una voce narrante che racconta storie in modo chiaro e dettagliato. Inizia la storia con una breve introduzione che stabilisca il contesto o l'ambientazione, come: "In un lontano villaggio..." e concludi con una frase che segna la fine della storia. Scrivi solo il copione senza etichette o commenti. Il narratore deve solo introdurre e concludere la storia.
  `;

    let story = '';
    let currentLength = 0;

    for (let i = 0; i < min; i++) {
      const userMessage = script
        ? `
        Scrivi una sceneggiatura per una storia con ${wordCount} personaggi: ${nameCharacters}.  
        La storia si svolge a ${place} e tratta il tema ${argument}.  
        Deve essere lunga circa ${Math.min(characterCount - currentLength, 750)} caratteri .  
        **Usa solo** nomi di personaggi senza etichette.
        La storia deve iniziare con una breve introduzione del narratore, come ad esempio: "Nel cuore di una foresta, il sole tramontava dietro gli alberi..." e deve terminare con una conclusione narrata.
        Scrivi solo il copione in questo formato:

        **Esempio**
        Narante: La storia inizia...
        Nome1: Cosa sta succedendo?  
        Nome2: Non lo so, ma dobbiamo muoverci in fretta!  
        Nome3: D'accordo, seguitemi!  

        Non usare parentesi, non aggiungere descrizioni o titoli.
      `
        : `
        Racconta la storia di "${title}" che si svolge nel luogo "${place}".  
        La storia deve includere ${wordCount} personaggi principali, i cui nomi sono "${nameCharacters}".  
        La trama della storia dovrebbe esplorare il tema "${argument}".  
        La storia deve iniziare con una breve introduzione che stabilisca l'ambientazione, come ad esempio: "Nel cuore di una foresta, il sole tramontava dietro gli alberi..." e concludere con una frase che segni la fine della storia.  
        La storia deve essere lunga circa ${Math.min(characterCount - currentLength, 750)} caratteri  e raccontata dal punto di vista di un narratore che solo introduce e conclude la storia.
      `;

      console.log(`Cycle ${i + 1}: Requesting up to ${Math.min(characterCount - currentLength, 750)} characters.`);
      
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
      });

      const part = response.choices[0].message.content ?? '';
      console.log(`Generated part length: ${part.length} characters.`);
      
      story += part;
      currentLength += part.length;

      console.log("Current Length after cycle", i + 1, ":", currentLength);

      if (currentLength >= characterCount) {
        console.log("Target character count reached or exceeded.");
        break;
      }
    }

    console.log("Final currentLength:", currentLength);
    return story;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to communicate with ChatGPT.');
  }
};

