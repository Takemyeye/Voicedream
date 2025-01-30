import { UserStory } from '../entities/userStory';
import { AppDataSource } from '../ormconfig';

export const saveUserStory = async (story: string, userId: string, voiceId: string) => {
  const userStoryRepository = AppDataSource.getRepository(UserStory);

  const newUserStory = new (UserStory);
  // in questo caso salva solo testo della storia
    newUserStory.story = story
    newUserStory.userId = userId
    newUserStory.voiceId = voiceId

  await userStoryRepository.save(newUserStory);

  return newUserStory;
};
