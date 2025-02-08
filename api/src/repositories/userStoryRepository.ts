import { UserStory } from '../entities/userStory';
import { AppDataSource } from '../ormconfig';

export const saveUserStory = async (userStoryId: string, userId: string, voiceId: string, storyId: string) => {
  const userStoryRepository = AppDataSource.getRepository(UserStory);

  const newUserStory = new (UserStory);
    newUserStory.id = userStoryId
    newUserStory.userId = userId
    newUserStory.voiceId = voiceId
    newUserStory.storyId = storyId

  await userStoryRepository.save(newUserStory);

  return newUserStory;
  
};
