import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

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
    
    ffmpeg()
      .input('anullsrc=r=44100:cl=stereo')
      .output(silenceFilePath)
      .duration(silenceDuration)
      .on('end', () => {
        const fileListContent = tempFiles
          .map((file) => `file '${file}'`)
          .concat(`file '${silenceFilePath}'`)
          .join('\n');

        fs.writeFileSync(fileListPath, fileListContent);

        const mergedFilePath = path.join(tempDir, 'merged_audio.mp3');
        const command = ffmpeg();

        command.input(fileListPath)
          .inputOption('-f', 'concat')
          .inputOption('-safe', '0')
          .on('error', (err) => {
            console.error('FFmpeg error:', err);
            tempFiles.forEach(fs.unlinkSync);
            fs.unlinkSync(fileListPath);
            fs.unlinkSync(silenceFilePath);
            reject(err);
          })
          .on('end', () => {
            console.log('Audio merging completed');
            const mergedBuffer = fs.readFileSync(mergedFilePath);

            tempFiles.forEach(fs.unlinkSync);
            fs.unlinkSync(fileListPath);
            fs.unlinkSync(silenceFilePath);
            fs.unlinkSync(mergedFilePath);

            resolve(mergedBuffer);
          })
          .output(mergedFilePath)
          .format('mp3')
          .run();
      })
      .run();
  });
};
