import { AppDataSource } from '../ormconfig';
import { Voice } from '../entities/voice';

export const saveVoice = async (voiceName: string, userId: string, voiceId: string) => {
  const voiceRepository = AppDataSource.getRepository(Voice);

  const newVoice= new (Voice);
  newVoice.voiceName = voiceName
  newVoice.userId = userId
  newVoice.id = voiceId

  await voiceRepository.save(newVoice);

  return newVoice;
};
