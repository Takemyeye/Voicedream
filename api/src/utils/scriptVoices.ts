import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

export const storyUnite = async (audioBuffers: Buffer[]): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    if (audioBuffers.length === 0) {
      return reject(new Error('No audio files to merge'));
    }

    const tempDir = path.join(os.tmpdir(), 'audio_merge');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFiles: string[] = audioBuffers.map((buffer, index) => {
      const tempFilePath = path.join(tempDir, `audio_${index}.mp3`);
      fs.writeFileSync(tempFilePath, buffer);
      return tempFilePath;
    });

    const fileListPath = path.join(tempDir, 'file_list.txt');
    const silenceDuration = 0.3;
    const silenceFilePath = path.join(tempDir, 'silence.mp3');
    
    try {
      execSync(`ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t ${silenceDuration} -q:a 9 -acodec libmp3lame ${silenceFilePath}`);
    } catch (error) {
      console.error('Error creating silence file:', error);
      return reject(error);
    }

    const fileListContent = tempFiles
      .map((file) => `file '${file}'`)
      .concat(`file '${silenceFilePath}'`)
      .join('\n');

    fs.writeFileSync(fileListPath, fileListContent);

    const mergedFilePath = path.join(tempDir, 'merged_audio.mp3');

    try {
      execSync(`ffmpeg -f concat -safe 0 -i ${fileListPath} -c:a libmp3lame -q:a 9 ${mergedFilePath}`);
    } catch (error) {
      console.error('Error during merging audio files:', error);
      tempFiles.forEach(fs.unlinkSync);
      fs.unlinkSync(fileListPath);
      fs.unlinkSync(silenceFilePath);
      return reject(error);
    }

    console.log('Audio merging completed');
    const mergedBuffer = fs.readFileSync(mergedFilePath);

    tempFiles.forEach(fs.unlinkSync);
    fs.unlinkSync(fileListPath);
    fs.unlinkSync(silenceFilePath);
    fs.unlinkSync(mergedFilePath);

    resolve(mergedBuffer);
  });
};
