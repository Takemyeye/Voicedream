import { AppDataSource } from '../ormconfig';
import { Stories } from '../entities/stories';
import { Voice } from '../entities/voice';

export const TTSController = async (storyId: string, userId: string, voiceId?: string) => {

  if (!storyId || !userId) {
    return null;
  }

  try {
    const storyRepository = AppDataSource.getRepository(Stories);
    const voiceRepository = AppDataSource.getRepository(Voice);
    
    const story = await storyRepository.findOne({ where: { storyId, userId } });
    
    let voice = null
    if(voiceId) {
      voice = await voiceRepository.findOne({ where: { voiceId } });
    }

    return { story: story?.story, voiceId: voice?.voiceId };
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};
