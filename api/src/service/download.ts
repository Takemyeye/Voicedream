import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const saveAudioFile = (audioData: any) => {
    const uniqueId = uuidv4();
    const fileName = `audio/${uniqueId}.mp3`;
    const filePath = path.join(process.cwd(), fileName);
    
    fs.writeFileSync(filePath, audioData);
  return uniqueId;
};
