import { Stories } from '../entities/stories';
import { AppDataSource } from '../ormconfig';

export const saveStory = async (story: string, userId: string) => {
  const storyRepository = AppDataSource.getRepository(Stories);

  const newStory = new Stories();
    newStory.story = story;
    newStory.userId = userId;

  await storyRepository.save(newStory);

  return newStory;
};
