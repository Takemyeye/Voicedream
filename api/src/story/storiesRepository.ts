import { Stories } from '../entities/stories';
import { AppDataSource } from '../ormconfig';

export const saveStory = async (story: string, userId: number) => {
  const storyRepository = AppDataSource.getRepository(Stories);

  const newStory = new Stories();
  newStory.story = story;
  newStory.userId = userId;
  newStory.storyId = Math.floor(10000 + Math.random() * 90000);

  await storyRepository.save(newStory);

  return newStory;
};
