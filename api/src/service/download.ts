import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const saveAudioFile = (audioData: Buffer): string => {
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}.mp3`;
    const fileDir = path.join(process.cwd(), 'audio');
    const filePath = path.join(fileDir, fileName);

    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
    }

    fs.writeFileSync(filePath, audioData);
    return uniqueId;
};
