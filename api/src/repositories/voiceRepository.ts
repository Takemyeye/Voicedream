import { AppDataSource } from '../ormconfig';
import { Voice } from '../entities/voice';

export const saveVoice = async (voiceName: string, voiceId: string, userId: string) => {
  const voiceRepository = AppDataSource.getRepository(Voice);

  const newVoice = new (Voice);
  newVoice.voiceName = voiceName
  newVoice.voiceId = voiceId
  newVoice.userId = userId

  await voiceRepository.save(newVoice);

  return newVoice;
};
