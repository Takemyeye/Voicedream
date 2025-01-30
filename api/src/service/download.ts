import path from 'path';
import fs from 'fs';

export const saveAudioFile = (audioData: any) => {
    const fileName = `audio.mp3`;
    const filePath = path.join(process.cwd(), fileName);
    
    fs.writeFileSync(filePath, audioData);
  return filePath;
};
