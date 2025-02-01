import { AppDataSource } from '../ormconfig';
import { Stories } from '../entities/stories';
import { Voice } from '../entities/voice';

export const TTSController = async ( storyId: string, userId: string, voiceId: string) => {
  
  const id = voiceId;

  if (!storyId || !userId) {
    return null;
  }

  try {
    const storyRepository = AppDataSource.getRepository(Stories);
    const voiceRepository = AppDataSource.getRepository(Voice);
    const story = await storyRepository.findOne({ where: { userId, storyId } });
    const voice = await voiceRepository.findOne({ where: {id}});

    if (!userId) {
      return console.log('user: sbagliato');
    }

    console.log("voice:", voice?.id)
    return story?.story, voice?.id;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};
