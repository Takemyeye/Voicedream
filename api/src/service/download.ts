import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// salva file function
export const saveAudioFile = (audioData: any) => {
    const uniqueId = uuidv4();
    const fileName = `audio/${uniqueId}.mp3`;
    const filePath = path.join(process.cwd(), fileName);
    
    fs.writeFileSync(filePath, audioData);
  return uniqueId;
};
